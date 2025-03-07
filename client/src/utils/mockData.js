// Mock data for development and testing

export const mockActivities = [
  {
    _id: '1',
    title: 'Sensory Water Play',
    description: 'Develop fine motor skills and sensory exploration with water and various containers.',
    images: ['https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&auto=format&fit=crop'],
    timeRequired: 20,
    ageRange: { min: 1, max: 3 },
    developmentalAreas: ['sensory', 'motor'],
    materials: ['Water', 'Containers', 'Toys'],
    steps: [
      'Fill containers with water',
      'Add toys and tools for exploration',
      'Supervise play and encourage exploration'
    ],
    isPremium: false
  },
  {
    _id: '2',
    title: 'Color Sorting Game',
    description: 'Learn colors and practice categorization with this simple sorting activity.',
    images: ['https://images.unsplash.com/photo-1615147342761-9238e15d8b96?w=500&auto=format&fit=crop'],
    timeRequired: 15,
    ageRange: { min: 2, max: 4 },
    developmentalAreas: ['cognitive', 'motor'],
    materials: ['Colored objects', 'Sorting containers'],
    steps: [
      'Gather colored objects',
      'Set up sorting containers',
      'Demonstrate sorting by color',
      'Let child practice sorting'
    ],
    isPremium: false
  },
  {
    _id: '3',
    title: 'DIY Musical Instruments',
    description: 'Create simple instruments and explore rhythm, sound, and music concepts.',
    images: ['https://images.unsplash.com/photo-1619379179326-c50977cd30fa?w=500&auto=format&fit=crop'],
    timeRequired: 30,
    ageRange: { min: 3, max: 6 },
    developmentalAreas: ['creative', 'motor', 'cognitive'],
    materials: ['Empty containers', 'Rice/beans', 'Rubber bands'],
    steps: [
      'Gather materials',
      'Create shakers with containers and rice',
      'Make string instruments with rubber bands',
      'Explore different sounds'
    ],
    isPremium: false
  },
  {
    _id: '4',
    title: 'Nature Scavenger Hunt',
    description: 'Explore the outdoors while learning about nature and developing observation skills.',
    images: ['https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&auto=format&fit=crop'],
    timeRequired: 45,
    ageRange: { min: 4, max: 6 },
    developmentalAreas: ['cognitive', 'language', 'motor'],
    materials: ['Scavenger hunt list', 'Collection bag'],
    steps: [
      'Create a list of items to find',
      'Go outside and search for items',
      'Discuss findings and observations'
    ],
    isPremium: true
  },
  {
    _id: '5',
    title: 'Letter Recognition Game',
    description: 'Practice letter recognition and early literacy skills through play.',
    images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop'],
    timeRequired: 15,
    ageRange: { min: 3, max: 5 },
    developmentalAreas: ['language', 'cognitive'],
    materials: ['Letter cards', 'Small toys'],
    steps: [
      'Prepare letter cards',
      'Match toys to letters',
      'Practice letter sounds'
    ],
    isPremium: true
  },
  {
    _id: '6',
    title: 'Counting with Playdough',
    description: 'Develop number sense and fine motor skills with this tactile math activity.',
    images: ['https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=500&auto=format&fit=crop'],
    timeRequired: 20,
    ageRange: { min: 2, max: 4 },
    developmentalAreas: ['cognitive', 'motor'],
    materials: ['Playdough', 'Number cards'],
    steps: [
      'Roll playdough into balls',
      'Count the balls',
      'Form numbers with playdough'
    ],
    isPremium: false
  }
];

export const mockUser = {
  _id: 'user1',
  name: 'Jane Smith',
  email: 'jane@example.com',
  subscription: 'premium',
  subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  children: [
    {
      _id: 'child1',
      name: 'Emma',
      birthdate: new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000).toISOString(),
      interests: ['animals', 'drawing', 'music'],
      developmentalFocus: ['language', 'motor']
    },
    {
      _id: 'child2',
      name: 'Noah',
      birthdate: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000).toISOString(),
      interests: ['dinosaurs', 'space', 'building'],
      developmentalFocus: ['cognitive', 'social']
    }
  ]
};

export const mockFavorites = [
  mockActivities[1],
  mockActivities[4],
  mockActivities[5]
];

export const mockHistory = [
  {
    _id: 'history1',
    activity: mockActivities[0],
    completedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Emma loved playing with the water colors!'
  },
  {
    _id: 'history2',
    activity: mockActivities[2],
    completedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    notes: null
  },
  {
    _id: 'history3',
    activity: mockActivities[3],
    completedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Noah found all the items on the list!'
  },
  {
    _id: 'history4',
    activity: mockActivities[5],
    completedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    notes: null
  },
  {
    _id: 'history5',
    activity: mockActivities[1],
    completedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Both kids enjoyed this activity.'
  }
];