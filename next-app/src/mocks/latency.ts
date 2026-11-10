export const simulateLatency = (milliseconds: number = 400): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));