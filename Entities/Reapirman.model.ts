import { Timestamp } from "firebase/firestore";

export enum RepairmanPositons {
  Majstor = "Majstor",
  GlavniMajstor = "Glavni majstor",
}

export class Repairman {
  constructor(
    repairmanId: number,
    repairmanFirstName: string,
    repairmanLastName: string,
    repairmanPosition: RepairmanPositons,
    repairmanDateCreated: Timestamp | string,
    repairmanDateUpdated?: Timestamp,
    repairmanDateDeleted?: Timestamp
  ) {
    this.repairmanId = repairmanId;
    this.repairmanFirstName = repairmanFirstName;
    this.repairmanLastName = repairmanLastName;
    this.repairmanPosition = repairmanPosition;
    this.repairmanDateCreated = repairmanDateCreated;
    this.repairmanDateUpdated = repairmanDateUpdated;
    this.repairmanDateDeleted = repairmanDateDeleted;
  }

  private repairmanId: number;
  private repairmanFirstName: string;
  private repairmanLastName: string;
  private repairmanPosition: RepairmanPositons;
  private repairmanDateCreated: Timestamp | string;
  private repairmanDateUpdated?: Timestamp;
  private repairmanDateDeleted?: Timestamp;
}
