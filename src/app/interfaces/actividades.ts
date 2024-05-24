export type Root = Actividad[]

export interface Actividad {
  id: number
  name: string
  code: string
  image: string
  type_of_activities_id: number
  created_at: string
  updated_at: string
  type_of_activity: TypeOfActivity
}

export interface TypeOfActivity {
  id: number
  name: string
  created_at: string
  updated_at: string
}
