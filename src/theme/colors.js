export const pickerColors = [
    "#3498db", // Blue
    "#e74c3c", // Red
    "#2ecc71", // Green
    "#f39c12", // Orange
    "#9b59b6", // Purple
    "#e67e22", // Pumpkin
    "#f1c40f", // Yellow
];

export const themeColors = [
    "#3498db", // Blue
    "#e74c3c", // Red
    "#2ecc71", // Green
    "#f39c12", // Orange
    "#9b59b6", // Purple
    "#e67e22", // Pumpkin
    "#f1c40f", // Yellow
    "#1abc9c", // Turquoise
    "#34495e", // Dark Gray
    "#95a5a6", // Silver
    "#d35400", // Rust
    "#8e44ad", // Violet
    "#27ae60", // Emerald
];

// export const lightenColor = (hex, percent) => {
//     console.log(hex);   
//     if(hex){
//         return '';
//     }
//     let num = parseInt(hex.slice(1), 16);
//     let amt = Math.round(2.55 * percent);
//     let R = ((num >> 16) + amt) & 0xFF; // Enclose the expression in parentheses
//     let G = ((num >> 8) & 0x00FF) + amt; // Enclose the expression in parentheses
//     let B = (num & 0x0000FF) + amt;

//     console.log(`#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`)

//     return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
// };

export const gradients = {
    "0": "linear-gradient(to bottom right, #bdc3c7, #2c3e50)",
    "1": "linear-gradient(to bottom right, #ee9ca7, #ffdde1)",
    "2": "linear-gradient(to bottom right, #2193b0, #6dd5ed)",
    "3": "linear-gradient(to bottom right, #C6FFDD, #FBD786, #f7797d)",
    "4": "linear-gradient(to bottom right, #0F2027, #203A43, #f7797d)",
    "5": "linear-gradient(to bottom right, #12c2e9, #c471ed, #f7797d)",
    "6": "linear-gradient(to bottom right, #b92b27, #1565C0)",
    "7": "linear-gradient(to bottom right, #FF0099, #493240)",
    "8": "linear-gradient(to bottom right, #8E2DE2, #4A00E0)",
    "9": "linear-gradient(to bottom right, #1f4037, #99f2c8)",
    "10": "linear-gradient(to bottom right, #f12711, #f5af19)",
};

export function colorToHex(flutterColor) {
    if(flutterColor==null){
        return null;
    }
    const colorString = flutterColor.replace('Color(', '').replace(')', '');
    const colorNumber = parseInt(colorString, 16);
    const hexString = '#' + colorNumber.toString(16).toUpperCase().padStart(6, '0');
    return hexString;
}