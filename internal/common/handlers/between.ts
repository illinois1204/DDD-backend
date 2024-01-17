export function between<T>(from?: T, to?: T) {
    if (from != null && to != null) return { $gte: from, $lte: to };
    if (from != null && to == null) return { $gte: from };
    if (from == null && to != null) return { $lte: to };
    return { $ne: undefined };
}
