const HAS_LEFT = 2;
const HAS_RIGHT = 1;

class TreeNode<K, V> {
    left: TreeNode<K, V> | null = null;
    right: TreeNode<K, V> | null = null;
    key: K;
    value: V;
    /**
     * Bits of order 0 and 1 are reserved for the existence of left and right tree.
     */
    information = 0;

    constructor(key: K, value: V, predecessor: TreeNode<K, V> | null = null, successor: TreeNode<K, V> | null = null) {
        this.key = key;
        this.value = value;
        this.left = predecessor;
        this.right = successor;
    }

    first() {
        let node: TreeNode<K, V> = this;
        if (node.information & HAS_LEFT) {
            node = node.left!;
        }

        return node;
    }

    last() {
        let node: TreeNode<K, V> = this;
        if (node.information & HAS_RIGHT) {
            node = node.right!;
        }

        return node;
    }

    predecessor() {
        if (this.information & HAS_LEFT) {
            let node: TreeNode<K, V> = this.left!;

            while (node.information & HAS_RIGHT) {
                node = node.right!;
            }

            return node;
        }
        else {
            return this.left;
        }
    }

    successor() {
        if (this.information & HAS_RIGHT) {
            let node: TreeNode<K, V> = this.right!;

            while (node.information & HAS_LEFT) {
                node = node.left!;
            }

            return node;
        }
        else {
            return this.right;
        }
    }

    count() {
        let count = 1;

        if (this.information & HAS_LEFT) {
            count += this.left!.count();
        }

        if (this.information & HAS_RIGHT) {
            count += this.right!.count();
        }

        return count;
    }

    find(key: K, comparator: (n1: K, n2: K) => number, type = 0) {
        let node: TreeNode<K, V> = this;
        let cmp = 0;

        while (true) {
            cmp = comparator(key, node.key);

            if (cmp < 0 && node.information & HAS_LEFT) {
                node = node.left!;
            }
            else if (cmp > 0 && node.information & HAS_RIGHT) {
                node = node.right!;
            }
            else {
                break;
            }
        }

        if (cmp < 0) {
            if (type < 0) {
                return node.left;
            }
            else if (type > 0) {
                return node;
            }
            else {
                return null;
            }
        }
        else if (cmp > 0) {
            if (type < 0) {
                return node;
            }
            else if (type > 0) {
                return node.right;
            }
            else {
                return null;
            }
        }
        else {
            if (type < -1) {
                return node.predecessor();
            }
            else if (type > 1) {
                return node.successor();
            }
            else {
                return node;
            }
        }
    }

    rotateLeft() {
        const right: TreeNode<K, V> = this.right!;

        if (right.information & HAS_LEFT) {
            this.right = right.left;
            right.left = this;
        }
        else {
            right.information |= 2;
            this.information &= ~1;
        }

        this.information -= 4;

        if (right.information >= 4) {
            this.information -= right.information & ~3;
        }

        right.information -= 4;

        if (this.information < 0) {
            right.information += this.information & ~3;
        }

        return right;
    }

    rotateRight() {
        const left = this.left!;

        if (left.information & HAS_RIGHT) {
            this.left = left.right;
            left.right = this;
        }
        else {
            this.information &= ~2;
            left.information |= 1;
        }

        this.information += 4;

        if (left.information < 0) {
            this.information -= left.information & ~3;
        }

        left.information += 4;

        if (this.information >= 4) {
            left.information += this.information & ~3;
        }

        return left;
    }

    incBalance() {
        this.information += 4;

        if (this.information >= 8) {
            if (this.right!.information < 0) {
                this.right = this.right!.rotateRight();
            }

            return this.rotateLeft();
        }

        return this;
    }

    decBalance() {
        this.information -= 4;

        if (this.information < - 4) {
            if (this.left!.information >= 4) {
                this.left = this.left!.rotateLeft();
            }

            return this.rotateRight();
        }

        return this;
    }

    insert(key: K, value: V, comparator: (key1: K, key2: K) => number) {
        let node: TreeNode<K, V> = this;
        const cmp = comparator(key, this.key);

        if (cmp < 0) {
            if (this.information & HAS_LEFT) {
                const leftBalance = this.left!.information & ~3;
                this.left = this.left!.insert(key, value, comparator);

                if ((this.left!.information & ~3) && (this.left!.information & ~3) !== leftBalance) {
                    node = this.decBalance();
                }
            }
            else {
                this.left = new TreeNode(key, value, this.left, this);
                this.information |= 2;
                node = this.decBalance();
            }
        }
        else if (cmp > 0) {
            if (this.information & HAS_RIGHT) {
                const rightBalance = this.right!.information & ~3;
                this.right = this.right!.insert(key, value, comparator);

                if ((this.right.information & ~3) && (this.right.information & ~3) !== rightBalance) {
                    node = this.incBalance();
                }
            }
            else {
                this.right = new TreeNode(key, value, this, this.right);
                this.information |= 1;
                node = this.incBalance();
            }
        }
        else {
            this.value = value;
        }

        return node;
    }

    pullUpLeftMost() {
        if (this.information & HAS_RIGHT) {
            const leftBalance = this.left!.information & ~3;
            this.left = this.left!.pullUpLeftMost();

            if (!(this.information & HAS_LEFT) || leftBalance !== 0 && (this.left!.information & ~3) === 0) {
                return this.incBalance();
            }
            else {
                return this;
            }
        }
        else {
            this.left!.key = this.key;
            this.left!.value = this.value;

            if (this.information & HAS_RIGHT) {
                this.right!.left = this.left;

                return this.right!;
            }
            else {
                if (this.left!.right === this) {
                    this.left!.information &= ~1;

                    return this.right;
                }
                else {
                    this.right!.information &= ~2;

                    return this.left;
                }
            }
        }
    }

    remove(key: K, comparator: (k1: K, k2: K) => number) {
        const cmp = comparator(key, this.key);

        if (cmp < 0) {
            if (this.information & HAS_LEFT) {
                const leftBalance = this.left!.information & ~3;
                this.left = this.left!.remove(key, comparator);

                if (!(this.information & HAS_LEFT) || leftBalance !== 0 && (this.left!.information & ~3) === 0) {
                    return this.incBalance();
                }
            }
        }
        else if (cmp > 0) {
            if (this.information & HAS_RIGHT) {
                const rightBalance = this.right!.information & ~3;
                this.right = this.right!.remove(key, comparator);

                if (!(this.information & HAS_RIGHT) || rightBalance !== 0 && (this.right!.information & ~3) === 0) {
                    return this.decBalance();
                }
            }
        }
        else {
            if (this.information & HAS_RIGHT) {
                const rightBalance = this.right!.information & ~3;
                this.right = this.right!.pullUpLeftMost();

                if (!(this.information & HAS_RIGHT) || rightBalance !== 0 && (this.right!.information & ~3) === 0) {
                    return this.decBalance();
                }
            }
            else {
                const left: TreeNode<K, V> | null = this.left;
                const right: TreeNode<K, V> | null = this.right;

                if (this.information & HAS_LEFT) {
                    left!.right = right;

                    return left!;
                }
                else {
                    if (left && left.right === this) {
                        left.information &= ~1;

                        return right;
                    }
                    else if (right && right.left === this) {
                        right.information &= ~2;

                        return left;
                    }
                    else {
                        return null;
                    }
                }
            }
        }

        return this;
    }
}

class TreeMap<K extends number, V> {
    root: TreeNode<K, V>;

    comparator = (v1: number, v2: number) => v1 - v2;

    first() {
        if (this.root) {
            return this.root.first();
        }
        else {
            throw new Error('First element unexisting');
        }
    }

    last() {
        if (this.root) {
            return this.root.last();
        }
        else {
            throw new Error('Last element unexisting');
        }
    }

    put(key: K, value: V) {
        if (this.root) {
            this.root = this.root.insert(key, value, this.comparator);
        }
        else {
            this.root = new TreeNode(key, value);
        }
    }

    find(key: K) {
        const ret = this.root?.find(key, this.comparator, 0);
        if (!ret) {
            throw new Error('Element unexisting');
        }
        return ret;
    }

    ceiling(key: K) {
        const ret = this.root?.find(key, this.comparator, 1);
        if (!ret) {
            throw new Error('Element unexisting');
        }
        return ret;
    }

    remove(key: K) {
        this.root?.remove(key, this.comparator);
    }

}

const PROBABILITIY_TABLES: Array<number[]> = [];

PROBABILITIY_TABLES[0] = [
    0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02,
    0x01, 0x01
];

PROBABILITIY_TABLES[1] = [
    0x54, 0x16, 0x16, 0x0D, 0x0C, 0x08, 0x06, 0x05, 0x06, 0x05, 0x06, 0x03, 0x04, 0x04, 0x03, 0x05,
    0x0E, 0x0B, 0x14, 0x13, 0x13, 0x09, 0x0B, 0x06, 0x05, 0x04, 0x03, 0x02, 0x03, 0x02, 0x02, 0x02,
    0x0D, 0x07, 0x09, 0x06, 0x06, 0x04, 0x03, 0x02, 0x04, 0x03, 0x03, 0x03, 0x03, 0x03, 0x02, 0x02,
    0x09, 0x06, 0x04, 0x04, 0x04, 0x04, 0x03, 0x02, 0x03, 0x02, 0x02, 0x02, 0x02, 0x03, 0x02, 0x04,
    0x08, 0x03, 0x04, 0x07, 0x09, 0x05, 0x03, 0x03, 0x03, 0x03, 0x02, 0x02, 0x02, 0x03, 0x02, 0x02,
    0x03, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x01, 0x01, 0x01, 0x02, 0x01, 0x02, 0x02,
    0x06, 0x0A, 0x08, 0x08, 0x06, 0x07, 0x04, 0x03, 0x04, 0x04, 0x02, 0x02, 0x04, 0x02, 0x03, 0x03,
    0x04, 0x03, 0x07, 0x07, 0x09, 0x06, 0x04, 0x03, 0x03, 0x02, 0x01, 0x02, 0x02, 0x02, 0x02, 0x02,
    0x0A, 0x02, 0x02, 0x03, 0x02, 0x02, 0x01, 0x01, 0x02, 0x02, 0x02, 0x06, 0x03, 0x05, 0x02, 0x03,
    0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x03, 0x01, 0x01, 0x01,
    0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x04, 0x04, 0x04, 0x07, 0x09, 0x08, 0x0C, 0x02,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x01, 0x01, 0x03,
    0x04, 0x01, 0x02, 0x04, 0x05, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01,
    0x04, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x03, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x02, 0x01, 0x01, 0x02, 0x02, 0x02, 0x06, 0x4B,
    0x01, 0x01, 0x54, 0x16, 0x16, 0x0D, 0x0C, 0x08, 0x06, 0x05, 0x06, 0x05, 0x06, 0x03, 0x04, 0x04, 0x03, 0x05,
    0x0E, 0x0B, 0x14, 0x13, 0x13, 0x09, 0x0B, 0x06, 0x05, 0x04, 0x03, 0x02, 0x03, 0x02, 0x02, 0x02,
    0x0D, 0x07, 0x09, 0x06, 0x06, 0x04, 0x03, 0x02, 0x04, 0x03, 0x03, 0x03, 0x03, 0x03, 0x02, 0x02,
    0x09, 0x06, 0x04, 0x04, 0x04, 0x04, 0x03, 0x02, 0x03, 0x02, 0x02, 0x02, 0x02, 0x03, 0x02, 0x04,
    0x08, 0x03, 0x04, 0x07, 0x09, 0x05, 0x03, 0x03, 0x03, 0x03, 0x02, 0x02, 0x02, 0x03, 0x02, 0x02,
    0x03, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x01, 0x01, 0x01, 0x02, 0x01, 0x02, 0x02,
    0x06, 0x0A, 0x08, 0x08, 0x06, 0x07, 0x04, 0x03, 0x04, 0x04, 0x02, 0x02, 0x04, 0x02, 0x03, 0x03,
    0x04, 0x03, 0x07, 0x07, 0x09, 0x06, 0x04, 0x03, 0x03, 0x02, 0x01, 0x02, 0x02, 0x02, 0x02, 0x02,
    0x0A, 0x02, 0x02, 0x03, 0x02, 0x02, 0x01, 0x01, 0x02, 0x02, 0x02, 0x06, 0x03, 0x05, 0x02, 0x03,
    0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x03, 0x01, 0x01, 0x01,
    0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x04, 0x04, 0x04, 0x07, 0x09, 0x08, 0x0C, 0x02,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x01, 0x01, 0x03,
    0x04, 0x01, 0x02, 0x04, 0x05, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01,
    0x04, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x03, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x02, 0x01, 0x01, 0x02, 0x02, 0x02, 0x06, 0x4B,
    0x01, 0x01
];

PROBABILITIY_TABLES[2] = [
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x27, 0x00, 0x00, 0x23, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    -1, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x02, 0x01, 0x01, 0x06, 0x0E, 0x10, 0x04,
    0x06, 0x08, 0x05, 0x04, 0x04, 0x03, 0x03, 0x02, 0x02, 0x03, 0x03, 0x01, 0x01, 0x02, 0x01, 0x01,
    0x01, 0x04, 0x02, 0x04, 0x02, 0x02, 0x02, 0x01, 0x01, 0x04, 0x01, 0x01, 0x02, 0x03, 0x03, 0x02,
    0x03, 0x01, 0x03, 0x06, 0x04, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x01, 0x02, 0x01, 0x01,
    0x01, 0x29, 0x07, 0x16, 0x12, 0x40, 0x0A, 0x0A, 0x11, 0x25, 0x01, 0x03, 0x17, 0x10, 0x26, 0x2A,
    0x10, 0x01, 0x23, 0x23, 0x2F, 0x10, 0x06, 0x07, 0x02, 0x09, 0x01, 0x01, 0x01, 0x01, 0x01, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x01, 0x01
];

PROBABILITIY_TABLES[3] = [
    -1, 0x0B, 0x07, 0x05, 0x0B, 0x02, 0x02, 0x02, 0x06, 0x02, 0x02, 0x01, 0x04, 0x02, 0x01, 0x03,
    0x09, 0x01, 0x01, 0x01, 0x03, 0x04, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01,
    0x05, 0x01, 0x01, 0x01, 0x0D, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x02, 0x01, 0x01, 0x03, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01, 0x01,
    0x0A, 0x04, 0x02, 0x01, 0x06, 0x03, 0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x03, 0x01, 0x01, 0x01,
    0x05, 0x02, 0x03, 0x04, 0x03, 0x03, 0x03, 0x02, 0x01, 0x01, 0x01, 0x02, 0x01, 0x02, 0x03, 0x03,
    0x01, 0x03, 0x01, 0x01, 0x02, 0x05, 0x01, 0x01, 0x04, 0x03, 0x05, 0x01, 0x03, 0x01, 0x03, 0x03,
    0x02, 0x01, 0x04, 0x03, 0x0A, 0x06, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x02, 0x02, 0x01, 0x0A, 0x02, 0x05, 0x01, 0x01, 0x02, 0x07, 0x02, 0x17, 0x01, 0x05, 0x01, 0x01,
    0x0E, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x06, 0x02, 0x01, 0x04, 0x05, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x07, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01, 0x01,
    0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x11,
    0x01, 0x01
];

PROBABILITIY_TABLES[4] = [
    -1, -5, -104, -102, -124, -123, 99, 100, 62, 62, 34, 34, 19, 19, 24, 23, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
];

PROBABILITIY_TABLES[5] = [-1, -15, -99, -98, -102, -101, -102, -105, -109, -109, -116, -114, -122, -120, -128, -126, 124, 124, 114, 115, 105, 107, 95, 96, 85, 86, 74, 75, 64, 65, 55, 55, 47, 47, 39, 39, 33, 33, 27, 28, 23, 23, 19, 19, 16, 16, 13, 13, 11, 11, 9, 9, 8, 8, 7, 7, 6, 5, 5, 4, 4, 4, 25, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,];

PROBABILITIY_TABLES[6] = [-61, -53, -11, 65, -1, 123, -9, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -65, -52, -14, 64, -3, 124, -9, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 122, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,];

PROBABILITIY_TABLES[7] = [-61, -39, -17, 61, -7, 124, -23, 30, -3, -85, -15, 44, -4, 91, -2, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -67, -39, -20, 61, -11, 125, -24, 29, -5, -82, -16, 44, -5, 92, -1, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1];

PROBABILITIY_TABLES[8] = [-70, -59, -38, 51, -29, 109, -40, 24, -27, -108, -38, 35, -33, 74, -47, 16, -18, -81, -28, 44, -22, 90, -34, 21, -12, -121, -23, 33, -10, 67, -4, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -80, -57, -40, 51, -29, 107, -42, 24, -25, -107, -40, 35, -37, 73, -48, 17, -23, -78, -30, 43, -24, 92, -35, 21, -15, -121, -25, 32, -9, 68, -1, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 95, -98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,];

class HuffmanNode {
    parent: HuffmanNode | null = null;
    child: [HuffmanNode | null, HuffmanNode | null] = [null, null];
    next: HuffmanNode | null = null;
    prev: HuffmanNode | null = null;
    value: number;
    probability: number;

    insertAfter(where: HuffmanNode) {
        this.prev = where;
        this.next = where.next;
        where.next = this;
        this.next!.prev = this;
    }

    newList() {
        this.prev = this.next = this;
    }

    listSwap(withNode: HuffmanNode) {
        if (this.next === withNode) {
            this.next = withNode.next;
            withNode.next = this;
            withNode.prev = this.prev;
            this.prev = withNode;

            withNode.prev!.next = withNode;
            this.next!.prev = this;
        }
        else if (this.prev === withNode) {
            this.prev = withNode.prev;
            withNode.prev = this;
            withNode.next = this.next;
            this.next = withNode;

            withNode.next!.prev = withNode;
            this.prev!.next = this;
        }
        else {
            let temp = this.prev;
            this.prev = withNode.prev;
            withNode.prev = temp;

            temp = this.next;
            this.next = withNode.next;
            withNode.next = temp;

            this.prev!.next = this;
            this.next!.prev = this;

            withNode.prev!.next = withNode;
            withNode.next!.prev = withNode;
        }
    }

    treeSwap(withNode: HuffmanNode) {
        let temp: HuffmanNode | null = null;

        if (this.parent === withNode.parent) {
            temp = this.parent!.child[0];
            this.parent!.child[0] = this.parent!.child[1];
            this.parent!.child[1] = temp;
        }
        else {
            if (withNode.parent!.child[0] === withNode) {
                withNode.parent!.child[0] = this;
            }
            else {
                withNode.parent!.child[1] = this;
            }
            if (this.parent!.child[0] === this) {
                this.parent!.child[0] = withNode;
            }
            else {
                this.parent!.child[1] = withNode;
            }
        }
    }

}

class BitsReader {
    total: number = 0;
    byteIndex = 0;
    bitBuffer = 0;
    bitNumber = 0;

    constructor(public data: Uint8Array) {
        this.total = data.byteLength * 8;
    }

    unsignedRightShift(bitBuffer: number, bits: number) {
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

    getBit(bits: number) {
        while (this.bitNumber < bits && this.byteIndex < this.data.length) {
            const value = this.data[this.byteIndex++];

            this.bitBuffer |= (value & 0xFF) << this.bitNumber;

            this.bitNumber += 8;
        }

        const result = this.bitBuffer & ((1 << bits) - 1);

        this.bitBuffer = this.unsignedRightShift(this.bitBuffer, bits);
        this.bitNumber -= bits;

        return result;
    }

    canRead() {
        return this.byteIndex < this.data.byteLength;
    }
}

class Huffman {
    sorted = new TreeMap<number, HuffmanNode>();
    root: HuffmanNode | null = null;

    insertNode(node: HuffmanNode) {
        let test2: TreeNode<number, HuffmanNode> | null;
        try {
            test2 = this.sorted.ceiling(node.probability);
        } catch (e) {
            test2 = null;
        }
        let current: HuffmanNode | null = null;
        if (test2 !== null) {
            current = test2.value;
            node.insertAfter(current);
        } else {
            if (this.root !== null) {
                node.insertAfter(this.root.prev!);
            }
            else {
                node.newList();
            }
            this.root = node;
        }
        this.sorted.put(node.probability, node);
    }

    buildTree(tree: number) {
        const probabilities = PROBABILITIY_TABLES[tree];
        // generate leaves
        for (let i = 0; i < 0x102; i++) {
            const prob = probabilities[i] & 0xFF;

            if (prob === 0) {
                continue;
            }

            const node = new HuffmanNode();
            node.value = i;
            node.probability = prob;
            node.child[0] = null;
            node.child[1] = null;

            this.insertNode(node);
        }

        // generate tree
        let current: HuffmanNode = this.root!.prev!;
        while (current !== this.root) {
            const node = new HuffmanNode();
            const child1 = current;
            const child2 = current = current.prev!;

            child1.parent = node;
            child2.parent = node;

            node.value = -1;
            node.probability = child1.probability + child2.probability;
            node.child[0] = child1;
            node.child[1] = child2;
            this.insertNode(node);

            current = current.prev!;
        }

        this.root.parent = null;
    }

    addValueToTree(value: number) {
        // create leaf node
        const node = new HuffmanNode();
        node.value = value;
        node.probability = 0;
        node.child[0] = null;
        node.child[1] = null;

        this.insertNode(node);

        // create branch node
        const node2 = new HuffmanNode();
        const child1 = this.root!.prev!;
        const child2 = child1.prev!;

        node2.value = -1;
        node2.probability = child1.probability + child2.probability;
        node2.child[0] = child1;
        node2.child[1] = child2;
        node2.parent = child2.parent;

        node2.insertAfter(child2.prev!);

        // insert into tree
        if (node2.parent!.child[0] === child2) {
            node2.parent!.child[0] = node2;
        }
        else {
            node2.parent!.child[1] = node2;
        }

        child1.parent = node2;
        child2.parent = node2;

        return node;
    }

    incrementProbability(node: HuffmanNode | null) {
        while (node !== null) {
            // possible optimization here. Is all this really nescescary to enforce order?
            if (this.sorted.find(node.probability).value === node) {
                if (node.probability === node.prev!.probability) {
                    this.sorted.put(node.probability, node.prev!);
                }
                else {
                    this.sorted.remove(node.probability);
                }
            }

            node.probability += 1;
            let test2: TreeNode<number, HuffmanNode> | null;

            try {
                test2 = this.sorted.ceiling(node.probability);
            }
            catch (e) {
                test2 = null;
            }

            let where: HuffmanNode;

            if (test2 !== null) {
                where = test2.value.next!;
            } else {
                where = this.root!;
            }

            if (where !== node && where.parent !== null) {
                node.listSwap(where);
                node.treeSwap(where);

                if (where.probability !== where.next!.probability) {
                    this.sorted.put(where.probability, where);
                }
            }
            this.sorted.put(node.probability, node);
            node = node.parent;
        }
    }

    decode(data: Uint8Array) {
        const out: number[] = [];
        const is = new BitsReader(data);
        const type = is.getBit(8);
        this.buildTree(type);

        const adjustProbability = type === 0;
        while (true) {
            let current = this.root!;

            while (current.value === -1 && is.canRead()) {
                current = current.child[is.getBit(1)]!;
            }

            if (!is.canRead()) {
                break;
            }

            if (current.value === 0x101) {
                const value = is.getBit(8);
                current = this.addValueToTree(value);
                this.incrementProbability(current);
                if (!adjustProbability) {
                    this.incrementProbability(current);
                }
            }
            else if (current.value === 0x100) {
                break;
            }

            out.push(current.value);
            if (adjustProbability) {
                this.incrementProbability(current);
            }
        }

        return Uint8Array.from(out);
    }
}

export default function decodeHuffman(bytes: Uint8Array): Uint8Array {
    const node = new Huffman();
    return node.decode(bytes);
}