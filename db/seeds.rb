Decision.delete_all

Decision.create! (
  [
    {
      question: "which hot wallet should i use to store my crypto currencies",
      options: ['bread', 'blockchain', 'airbitz'],
      question_type: :public
    },
    {
      question: "I have an idea for a new app and I want to build an MVP. I think about writing it in Rails but I was told that it's hard to find developers. The second option would be Node but it'll take me some more time. which one would you use?",
      options: ['rails', 'node', 'something else'],
      question_type: :public
    },
    {
      question: "I am about to start my university years. I'm having trouble deciding between Electrical Engineering (which is quite broad) and Computer Science.",
      options: ['Electrical Engineering', 'Computer Science'],
      question_type: :public
    },
    {
      question: "We have an MVP which is built on Rails. We want to deploy it and we're not sure which service to choose. We don't have a DevOps specialist on our team at the moment, which one would you choose?",
      options: ['Heroku', 'Engine Yard', 'Digital Ocean', 'Linode'],
      question_type: :public
    },
    {
      question: "We built an app and need to establish some tools for analytics. There are many options and we care mostly on understanding 'User Journey'. which one would you choose?",
      options: ['Mixpanel', 'amplitude', 'heap', 'google analytics'],
      question_type: :public
    },
  ]
)
