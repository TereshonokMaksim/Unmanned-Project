export function isNumber(checking?: string | number): false | number {
    if (!checking) return false;
    if (typeof checking === "string") {
        if (checking.trim().length === 0) return false
    };
    const cookedChecking = Number(checking);
    if (isNaN(cookedChecking)) return false;
    return cookedChecking
};

export function isId(checking?: string | number): false | number {
    const afterChecking = isNumber(checking);
    if (afterChecking === false) return false;
    if (String(afterChecking).includes(".")) return false;
    if (afterChecking < 0) return false;
    return afterChecking
}

export function isURL(checking?: string): false | string{
    if (!checking) return false;
    try {
        new URL(checking);
        return checking
    }
    catch { return false }
}