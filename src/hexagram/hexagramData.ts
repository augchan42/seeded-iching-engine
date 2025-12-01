/**
 * Hexagram Data
 *
 * The 64 hexagrams of the I-Ching with their traditional names and characters.
 * Indexed by binary representation (bottom line first).
 */

export interface HexagramInfo {
  number: number;
  name: string;
  character: string;
}

/**
 * Map from binary string to hexagram info
 *
 * Binary format: 6 digits, bottom line first
 * 1 = Yang, 0 = Yin
 *
 * Example: "111111" = Qian (The Creative), all yang lines
 */
export const HEXAGRAM_DATA: Record<string, HexagramInfo> = {
  "111111": { number: 1, name: "Qian (The Creative)", character: "乾" },
  "000000": { number: 2, name: "Kun (The Receptive)", character: "坤" },
  "100010": { number: 3, name: "Zhun (Difficulty at the Beginning)", character: "屯" },
  "010001": { number: 4, name: "Meng (Youthful Folly)", character: "蒙" },
  "111010": { number: 5, name: "Xu (Waiting)", character: "需" },
  "010111": { number: 6, name: "Song (Conflict)", character: "訟" },
  "010000": { number: 7, name: "Shi (The Army)", character: "師" },
  "000010": { number: 8, name: "Bi (Holding Together)", character: "比" },
  "111011": { number: 9, name: "Xiao Xu (Small Taming)", character: "小畜" },
  "110111": { number: 10, name: "Lu (Treading)", character: "履" },
  "111000": { number: 11, name: "Tai (Peace)", character: "泰" },
  "000111": { number: 12, name: "Pi (Standstill)", character: "否" },
  "101111": { number: 13, name: "Tong Ren (Fellowship)", character: "同人" },
  "111101": { number: 14, name: "Da You (Great Possession)", character: "大有" },
  "001000": { number: 15, name: "Qian (Modesty)", character: "謙" },
  "000100": { number: 16, name: "Yu (Enthusiasm)", character: "豫" },
  "100110": { number: 17, name: "Sui (Following)", character: "隨" },
  "011001": { number: 18, name: "Gu (Work on the Decayed)", character: "蠱" },
  "110000": { number: 19, name: "Lin (Approach)", character: "臨" },
  "000011": { number: 20, name: "Guan (Contemplation)", character: "觀" },
  "100101": { number: 21, name: "Shi He (Biting Through)", character: "噬嗑" },
  "101001": { number: 22, name: "Bi (Grace)", character: "賁" },
  "000001": { number: 23, name: "Bo (Splitting Apart)", character: "剝" },
  "100000": { number: 24, name: "Fu (Return)", character: "復" },
  "100111": { number: 25, name: "Wu Wang (Innocence)", character: "無妄" },
  "111001": { number: 26, name: "Da Xu (Great Taming)", character: "大畜" },
  "100001": { number: 27, name: "Yi (Nourishment)", character: "頤" },
  "011110": { number: 28, name: "Da Guo (Great Exceeding)", character: "大過" },
  "010010": { number: 29, name: "Kan (The Abysmal Water)", character: "坎" },
  "101101": { number: 30, name: "Li (The Clinging Fire)", character: "離" },
  "001110": { number: 31, name: "Xian (Influence)", character: "咸" },
  "011100": { number: 32, name: "Heng (Duration)", character: "恆" },
  "001111": { number: 33, name: "Dun (Retreat)", character: "遯" },
  "111100": { number: 34, name: "Da Zhuang (Great Power)", character: "大壯" },
  "000101": { number: 35, name: "Jin (Progress)", character: "晉" },
  "101000": { number: 36, name: "Ming Yi (Darkening of the Light)", character: "明夷" },
  "101011": { number: 37, name: "Jia Ren (The Family)", character: "家人" },
  "110101": { number: 38, name: "Kui (Opposition)", character: "睽" },
  "001010": { number: 39, name: "Jian (Obstruction)", character: "蹇" },
  "010100": { number: 40, name: "Jie (Deliverance)", character: "解" },
  "110001": { number: 41, name: "Sun (Decrease)", character: "損" },
  "100011": { number: 42, name: "Yi (Increase)", character: "益" },
  "111110": { number: 43, name: "Guai (Breakthrough)", character: "夬" },
  "011111": { number: 44, name: "Gou (Coming to Meet)", character: "姤" },
  "000110": { number: 45, name: "Cui (Gathering Together)", character: "萃" },
  "011000": { number: 46, name: "Sheng (Pushing Upward)", character: "升" },
  "010110": { number: 47, name: "Kun (Oppression)", character: "困" },
  "011010": { number: 48, name: "Jing (The Well)", character: "井" },
  "101110": { number: 49, name: "Ge (Revolution)", character: "革" },
  "011101": { number: 50, name: "Ding (The Cauldron)", character: "鼎" },
  "100100": { number: 51, name: "Zhen (The Arousing Thunder)", character: "震" },
  "001001": { number: 52, name: "Gen (Keeping Still Mountain)", character: "艮" },
  "001011": { number: 53, name: "Jian (Development)", character: "漸" },
  "110100": { number: 54, name: "Gui Mei (The Marrying Maiden)", character: "歸妹" },
  "101100": { number: 55, name: "Feng (Abundance)", character: "豐" },
  "001101": { number: 56, name: "Lu (The Wanderer)", character: "旅" },
  "011011": { number: 57, name: "Xun (The Gentle Wind)", character: "巽" },
  "110110": { number: 58, name: "Dui (The Joyous Lake)", character: "兌" },
  "010011": { number: 59, name: "Huan (Dispersion)", character: "渙" },
  "110010": { number: 60, name: "Jie (Limitation)", character: "節" },
  "110011": { number: 61, name: "Zhong Fu (Inner Truth)", character: "中孚" },
  "001100": { number: 62, name: "Xiao Guo (Small Exceeding)", character: "小過" },
  "101010": { number: 63, name: "Ji Ji (After Completion)", character: "既濟" },
  "010101": { number: 64, name: "Wei Ji (Before Completion)", character: "未濟" },
};

/**
 * Get hexagram info by binary string
 */
export function getHexagramByBinary(binary: string): HexagramInfo | undefined {
  return HEXAGRAM_DATA[binary];
}

/**
 * Get hexagram info by number (1-64)
 */
export function getHexagramByNumber(num: number): HexagramInfo | undefined {
  return Object.values(HEXAGRAM_DATA).find((h) => h.number === num);
}
