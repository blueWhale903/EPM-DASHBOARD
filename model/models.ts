export type Event = {
  id: string;
  name: string;
  school_year: string;
  semester: number;
  category: string;
  category_index: string;
  organization: string;
  start_date: string;
  end_date: string;
  description: string;
  owner: string;
  status: boolean;
  users: { name: string };
};

export type Participant = {
  student_id: string;
  name: string;
  event_id: string;
  note: string;
  achievement: string;
  reward_org: string;
  major_id: string;
  mark: number;
};

export type Participation = {
  student_id: string;
  name: string;
  event_id: string;
  note: string;
  achievement: string;
  reward_org: string;
  major_id: string;
  mark: number;
  events: {
    category: string;
    name: string;
  };
};

export type Member = {
  id: string;
  name: string;
  class_code: string;
  department_id: number;
  departments: {
    name: string;
  };
};
