const INITIAL_ADPCM_STEP_INDEX = 0x2C;
const CHANGE_TABLE = [
    -1, 0, -1, 4, -1, 2, -1, 6,
    -1, 1, -1, 5, -1, 3, -1, 7,
    -1, 1, -1, 5, -1, 3, -1, 7,
    -1, 2, -1, 4, -1, 6, -1, 8
];
const STEP_TABLE = [
    7, 8, 9, 10, 11, 12, 13, 14,
    16, 17, 19, 21, 23, 25, 28, 31,
    34, 37, 41, 45, 50, 55, 60, 66,
    73, 80, 88, 97, 107, 118, 130, 143,
    157, 173, 190, 209, 230, 253, 279, 307,
    337, 371, 408, 449, 494, 544, 598, 658,
    724, 796, 876, 963, 1060, 1166, 1282, 1411,
    1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024,
    3327, 3660, 4026, 4428, 4871, 5358, 5894, 6484,
    7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899,
    15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794,
    32767
];

const STEP_TABLE_LENGTH = STEP_TABLE.length - 1;

class ADPCMChannel {
    public sampleValue: number;
    public stepIndex: number;
}

function unsignedRightShift(bitBuffer: number, bits: number) {
    if (bits >= 32 || bits < -32) {
        const m = (bits / 32);
        bits = bits - (m * 32);
    }
    if (bits < 0) {
        bits = 32 + bits;
    }
    if (bits === 0) {
        return ((bitBuffer >> 1) & 0x7fffffff) * 2 + ((bitBuffer >> bits) & 1);
    }
    if (bitBuffer < 0) {
        bitBuffer = (bitBuffer >> 1);
        bitBuffer &= 0x7fffffff;
        bitBuffer |= 0x40000000;
        bitBuffer = (bitBuffer >> (bits - 1));
    } else {
        bitBuffer = (bitBuffer >> bits);
    }
    return bitBuffer;
}

class TADPCMStream {
    pos = 0;
    view: DataView;
    constructor(public data: Uint8Array) {
        this.view = new DataView(data.buffer);
    }

    public readByteSample(): number {
        return this.view.getInt8(this.pos++);
    }

    public readWordSample(): number {
        const ret = this.view.getInt16(this.pos, true);
        this.pos += 2;
        return ret;
    }

    public canRead() {
        return this.pos < this.data.byteLength;
    }
}

class TADPCMOutStream {
    data: number[] = [];

    constructor(public max: number) {
    }

    writeWordSample(value: number) {
        if (this.max - this.data.length < 2) {
            return false;
        }
        this.data.push(value & 0xFF);
        this.data.push((value >> 0x08) & 0xFF);
        return true;
    }
}

class ADPCM {
    state: ADPCMChannel[] = [];

    constructor(channelmax: number) {
        for (let i = 0; i < channelmax; i++) {
            this.state[i] = new ADPCMChannel();
        }
    }

    decompress(data: Uint8Array, channeln: number) {
        const is = new TADPCMStream(data);
        const out = new TADPCMOutStream(Number.MAX_VALUE);
        const stepshift = unsignedRightShift(is.readWordSample(), 8);

        // initialize channels
        for (let i = 0; i < channeln; i++) {
            const chan = this.state[i];
            chan.stepIndex = INITIAL_ADPCM_STEP_INDEX;
            chan.sampleValue = is.readWordSample();

            // $output .= pack("s", $chan->sampleValue);
            out.writeWordSample(chan.sampleValue);
        }

        let current = channeln - 1;

        // decompress
        while (is.canRead()) {
            const op = is.readByteSample();
            current = (current + 1) % channeln;
            const chan = this.state[current];

            if ((op & 0x80) !== 0) {
                switch (op & 0x7F) {
                    // write current value
                    case 0:
                        if (chan.stepIndex !== 0) {
                            chan.stepIndex -= 1;
                        }
                        out.writeWordSample(chan.sampleValue);

                        break;

                    // increment period
                    case 1:
                        chan.stepIndex += 8;
                        if (chan.stepIndex > STEP_TABLE_LENGTH) {
                            chan.stepIndex = STEP_TABLE_LENGTH;
                        }
                        current = (current + 1) % channeln;
                        break;

                    // skip channel (unused?)
                    case 2:
                        current = (current + 1) % channeln;
                        break;

                    // all other values (unused?)
                    default:
                        chan.stepIndex -= 8;
                        if (chan.stepIndex < 0) {
                            chan.stepIndex = 0;
                        }

                        break;
                }
            }
            else {
                // adjust value
                const stepbase = STEP_TABLE[chan.stepIndex];
                let step = unsignedRightShift(stepbase, stepshift);

                for (let i = 0; i < 6; i++) {
                    if ((op & (1 << i)) !== 0) {
                        step += unsignedRightShift(stepbase, i);
                    }
                }

                if ((op & 0x40) !== 0) {
                    chan.sampleValue = Math.max(chan.sampleValue - step, -32768);
                } else {
                    chan.sampleValue = Math.min(chan.sampleValue + step, 32767);
                }

                out.writeWordSample(chan.sampleValue);

                chan.stepIndex += CHANGE_TABLE[op & 0x1F];
                if (chan.stepIndex < 0) {
                    chan.stepIndex = 0;
                } else if (chan.stepIndex > STEP_TABLE_LENGTH) {
                    chan.stepIndex = STEP_TABLE_LENGTH;
                }
            }
        }

        return Uint8Array.from(out.data);
    }
}

export default function decompressADPCM(data: Uint8Array, channelCount: 1 | 2, size: number) {
    return new ADPCM(2).decompress(data, channelCount);
}