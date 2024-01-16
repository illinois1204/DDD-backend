export function between(from?: number | Date, to?: number | Date) {
    if (from != null && to != null) return { $gte: from, $lte: to };
    if (from != null && to == null) return { $gte: from };
    if (from == null && to != null) return { $lte: to };
    return { $ne: null };
}
