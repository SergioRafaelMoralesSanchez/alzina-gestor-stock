export function sortArray<T>(array: T[], key: keyof T, order: number): T[] {
    return array.sort((a, b) => {
        console.log("🚀 ~ file: dashboard.component.ts:125 ~ DashboardComponent ~ returnarray.sort ~ typeof valueA:", typeof a[key]);
        const valueA = a[key] ?? "";
        const valueB = b[key] ?? "";
        let result = 0;

        if (typeof valueA === 'object' && typeof valueB === 'object') {
            result = valueA.toString().localeCompare(valueB.toString());
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
            result = valueA.localeCompare(valueB);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
            result = valueA < valueB ? -1 : 1;
        } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
            result = (valueA === valueB) ? 0 : valueA ? -1 : 1;
        }
        return order === 1 ? -1 : 1 * result;
    });

}