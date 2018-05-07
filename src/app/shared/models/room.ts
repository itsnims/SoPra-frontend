import {User} from './user';

export class Room {
  public id: number;
  public name: string;
  public owner: string;
  public path: string;
  public maxPlayers: string;
  public current: number;
  public status: string;
  public players: User[]= [];
}
