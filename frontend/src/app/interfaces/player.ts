export interface Player {
  id: number;
  long_name: string;
  player_face_url: string;
  club_name?: string;
  nationality_name?: string;
  player_positions: string;
  fifa_version: string;
  age: number;

  // Skills clave para gráfico radar o evolución
  pace?: number;
  shooting?: number;
  passing?: number;
  dribbling?: number;
  defending?: number;
  physic?: number;
}
