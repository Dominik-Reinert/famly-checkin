//generated from retrieved data put through: http://json2ts.com/

export declare module Daycare {
  export interface Name {
    fullName: string;
    firstName: string;
    middleName: string;
    lastName: string;
  }

  export interface Image {
    small: string;
    large: string;
    empty: boolean;
  }

  export interface Checkin {
    childCheckinId: string;
    childId: string;
    institutionId: string;
    groupId: string;
    checkinTime: Date;
    pickupTime: Date;
    pickupRelationId: string;
    goHomeWithChildId: string;
    checkoutTime?: Date;
    checkinLoginId: string;
    checkoutLoginId: string;
    autoCheckedOut: boolean;
    deletedAt?: any;
    hours?: number;
    checkinStatements?: any;
  }

  export interface Child {
    childId: string;
    institutionId: string;
    groupId: string;
    createdTime: Date;
    name: Name;
    birthday: Date;
    homeAddress?: any;
    extraInfo: string;
    language: string;
    nationality: string;
    birthplace: string;
    gender: number;
    startDate: Date;
    endDate?: any;
    leavingReason?: any;
    email?: any;
    loginId: string;
    relations?: any;
    image: Image;
    isSleeping: boolean;
    naps: any[];
    hasVacation: boolean;
    isSick: boolean;
    isAbsent: boolean;
    leaves: any[];
    onBus: boolean;
    onTrip: boolean;
    statuses: any[];
    statusRegistrations: any[];
    checkins: Checkin[];
    checkedIn: boolean;
    checkinTime?: Date;
    pickupTime?: Date;
    pickupRelationId: string;
    pickupName: string;
  }

  export interface RootObject {
    children: Child[];
  }
}
