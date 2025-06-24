export interface Player {
  id: number;
  long_name: string;
  player_face_url: string;
  club_name?: string;
  nationality_name?: string;
  player_positions: string;
  fifa_version: string;
  fifa_update: string;
  age: number;
  overall: number;
  height_cm?: number;
  weight_kg?: number;
  preferred_foot?: string;
  
  // Estadísticas principales
  pace?: number;
  shooting?: number;
  passing?: number;
  dribbling?: number;
  defending?: number;
  physic?: number;
  
  // Estadísticas específicas relevantes
  attacking_finishing?: number;
  skill_ball_control?: number;
  movement_reactions?: number;
  power_shot_power?: number;
}