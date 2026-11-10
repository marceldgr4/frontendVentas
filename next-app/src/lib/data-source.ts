export type DataSource = "mock" |"api"

export const dataSource: DataSource =
    process.env.NEXT_PUBLIC_DATA_SOURCE === "api"? "api" : "mock";

export function selectRepository<T>(mockRepository: T,apiRepository: T):T {
    return dataSource ==="mock" ? mockRepository : apiRepository;
}