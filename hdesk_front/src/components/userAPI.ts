export interface IUser {
    id: number,
    permissionsOfficeList: string,
    acceptOffice: {
        room: string
    },
    defaultOffice: {
        room: string
    },
    defaultDesk: {
        desk: string
    },
    operatorName: string,
    operatorID: number,
}

const user: IUser =
{
    id: 4,
    permissionsOfficeList: "IT1,IT2,IT3,IT4",
    acceptOffice: {
        room: "IT4"
    },
    defaultOffice: {
        room: "IT4"
    },
    defaultDesk: {
        desk: "IT4.4"
    },
    operatorName: "Agnieszka Hewusz",
    operatorID: 6440,
};

export const MockUser = () => Promise.resolve(user);