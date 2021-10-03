import { AbstractStore } from "./abstract_store";
import { Daycare } from "./daycare_server_interfaces";
import { ServerData } from "./server_data";
interface ChildName {
  fullName: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface Child {
  id: string;
  name: ChildName;
}

interface AdaptedDaycareData {
  children: Child[];
}

interface DaycareData {
  daycareRoot: ServerData<Daycare.RootObject>;
}

class DaycareStore extends AbstractStore<DaycareData, AdaptedDaycareData> {
  adaptData(data: DaycareData): AdaptedDaycareData {
    return {
      children: data.daycareRoot
        .get()
        .children.map((child) => ({ name: child.name, id: child.childId })),
    };
  }
}

export const daycareStore: DaycareStore = new DaycareStore({
  daycareRoot: createDaycareRootServerData(),
});

function createDaycareRootServerData(): ServerData<Daycare.RootObject> {
  return new ServerData<Daycare.RootObject>({
    fetch: () =>
      fetch(
        "https://tryfamly.co/api/daycare/tablet/group?accessToken=234ffdb8-0889-4be3-b096-97ab1679752c&groupId=11fc220c-ebba-4e55-9346-cd1eed714620&institutionId=fb6c8114-387e-4051-8cf7-4e388a77b673"
      ).then((result) => result.json()) as Promise<Daycare.RootObject>,
  });
}
