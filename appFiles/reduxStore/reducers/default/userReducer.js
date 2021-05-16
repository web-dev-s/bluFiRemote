

export const userDefault = {
  userDetail: {
    data: {
      profile_id: "",
      name: "",
      about: "",
      job_title: "",
      education: "",
      birthday: "",
      age: 0,
      gender: "",
      living_in: "",
      hobbies: "",
      self_score: 1,
      average_score: "1.00",
      scores_count: 0,
      avatar: "",
      media: [],
      settings: {
        radius: "0",
        allow_location: "1",
        unit_of_measure: "km",
        allow_notifications: "1"
      },
      distance: ''
    }
  },
  credentials: {
    token_type: '',
    expires_in: 1800,
    access_token: '',
    refresh_token: ''
  },
  chatPusherEnabled: false,
  activeScreen: '',
  blockedProfileIds: [],
};
