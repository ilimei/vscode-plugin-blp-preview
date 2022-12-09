import { int16ToUint8Arr } from "../common/typecast";

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

const STEP_TABLE_LENGTH = 89;

const ERROR = 0xFFFFFFFF;

class TADPCMStream {
    pos = 0;
    view: DataView;
    constructor(public data: Uint8Array) {
        this.view = new DataView(data.buffer);
    }

    public readByteSample(): number {
        if (this.pos >= this.data.byteLength) {
            return ERROR;
        }
        return this.view.getInt8(this.pos++);
    }

    public readWordSample(): number {
        if (this.pos >= this.data.byteLength) {
            return ERROR;
        }
        const ret = this.view.getInt16(this.pos, true);
        this.pos += 2;
        return ret;
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
        const [a1, a2] = int16ToUint8Arr(value);
        this.data.push(a1);
        this.data.push(a2);
        return true;
    }
}

function getNextStepIndex(stepIndex: number, encodedSample: number): number {
    // Get the next step index
    stepIndex += CHANGE_TABLE[encodedSample & 0x1f];

    // Don't make the step index overflow
    if (stepIndex < 0) {
        stepIndex = 0;
    } else if (stepIndex > 88) {
        stepIndex = 88;
    }

    return stepIndex;
}

function updatePredictedSample(
    predictedSample: number,
    encodedSample: number,
    difference: number
): number {
    // Is the sign bit set?
    if (encodedSample & 0x40) {
        predictedSample -= difference;
        if (predictedSample <= -32768) {
            predictedSample = -32768;
        }
    } else {
        predictedSample += difference;
        if (predictedSample >= 32767) {
            predictedSample = 32767;
        }
    }

    return predictedSample;
}

function decodeSample(
    predictedSample: number,
    encodedSample: number,
    stepSize: number,
    difference: number
): number {
    if (encodedSample & 0x01) {
        difference += stepSize >> 0;
    }

    if (encodedSample & 0x02) {
        difference += stepSize >> 1;
    }

    if (encodedSample & 0x04) {
        difference += stepSize >> 2;
    }

    if (encodedSample & 0x08) {
        difference += stepSize >> 3;
    }

    if (encodedSample & 0x10) {
        difference += stepSize >> 4;
    }

    if (encodedSample & 0x20) {
        difference += stepSize >> 5;
    }

    return updatePredictedSample(predictedSample, encodedSample, difference);
}

export default function decompressADPCM(data: Uint8Array, channelCount: 1 | 2, size: number) {
    const out = new TADPCMOutStream(size);
    const predictedSamples: number[] = [];        // Predicted sample for each channel
    const stepIndexes = [INITIAL_ADPCM_STEP_INDEX, INITIAL_ADPCM_STEP_INDEX];         // Predicted step index for each channel
    const is = new TADPCMStream(data);

    // The first byte is always zero, the second one contains bit shift (compression level - 1)
    is.readByteSample();
    const bitShift = is.readByteSample();

    // Next, InitialSample value for each channel follows
    for (let i = 0; i < channelCount; i++) {
        // Get the initial sample from the input stream
        const initialSample = is.readWordSample();

        // Attempt to read the initial sample
        if (initialSample === ERROR) {
            throw new Error('read initialSample error');
        }

        // Store the initial sample to our sample array
        predictedSamples[i] = initialSample;

        // Also store the loaded sample to the output stream
        if (!out.writeWordSample(initialSample)) {
            return Uint8Array.from(out.data);
        }
    }

    // Get the initial index
    let channelIndex = channelCount - 1;

    let encodedSample: number;
    while ((encodedSample = is.readByteSample()) !== ERROR) {
        // If we have two channels, we need to flip the channel index
        channelIndex = (channelIndex + 1) % channelCount;

        if (encodedSample === 0x80) {
            if (stepIndexes[channelIndex] !== 0) {
                stepIndexes[channelIndex]--;
            }

            if (!out.writeWordSample(predictedSamples[channelIndex])) {
                break;
            }
        } else if (encodedSample === 0x81) {
            // Modify the step index
            stepIndexes[channelIndex] += 8;
            if (stepIndexes[channelIndex] > 0x58) {
                stepIndexes[channelIndex] = 0x58;
            }

            // Next pass, keep going on the same channel
            channelIndex = (channelIndex + 1) % channelCount;
        } else {
            const stepIndex = stepIndexes[channelIndex];
            const stepSize = STEP_TABLE[stepIndex];

            // Encode one sample
            predictedSamples[channelIndex] = decodeSample(predictedSamples[channelIndex],
                encodedSample,
                stepSize,
                stepSize >> bitShift);

            // Write the decoded sample to the output stream
            if (!out.writeWordSample(predictedSamples[channelIndex])) {
                break;
            }

            // Calculates the step index to use for the next encode
            stepIndexes[channelIndex] = getNextStepIndex(stepIndex, encodedSample);
        }
    }

    return Uint8Array.from(out.data);
}