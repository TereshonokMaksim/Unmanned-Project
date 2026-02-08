const ERROR_START = "\n•——————————•\n\n"
const ERROR_END = "\n\n•——————————•\n"

export function createError(errorConsoleDescription: string, errorText: string | string[], moreData?: {[key: string]: any}){ 
    /*
        if errorText is an array, then first string should be name of Error (what will be displayed in console)
        and second string as a cause (use for error checking in controller or service layers)
    */
    let moreDataText = "";
    if (moreData){
        moreDataText = "\n\nMore Info:"
        Object.keys(moreData).forEach((el) => {moreDataText += `\n${el}: ${moreData[el]}`})
    };
    console.error(`${ERROR_START}${errorConsoleDescription}${moreDataText}${ERROR_END}`);
    if (typeof errorText === "string") throw new Error(errorText);
    throw new Error(errorText[0], {cause: errorText[1]})
}