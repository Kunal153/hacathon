import { Branch, Note, Review, User } from '../types';

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'cse',
    name: 'Computer Science & Engineering',
    shortCode: 'CSE',
    iconName: 'Cpu',
    description: 'Algorithms, operating systems, distributed architectures, network security, and software systems.',
    totalNotes: 48,
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    subjectsBySemester: {
      1: ['Engineering Mathematics I', 'Programming in C', 'Engineering Physics', 'Basic Electrical'],
      2: ['Engineering Mathematics II', 'Data Structures & Algorithms', 'Digital Logic Design', 'Environmental Science'],
      3: ['Discrete Mathematics', 'Object Oriented Programming (Java/C++)', 'Computer Organization & Architecture', 'Theory of Computation'],
      4: ['Design & Analysis of Algorithms', 'Operating Systems', 'Database Management Systems', 'Software Engineering'],
      5: ['Computer Networks', 'Compiler Design', 'Web Technologies', 'Artificial Intelligence Basics'],
      6: ['Machine Learning', 'Cloud Computing', 'Information & Cyber Security', 'Mobile App Development'],
      7: ['Distributed Systems', 'Big Data Analytics', 'DevOps & SRE', 'Natural Language Processing'],
      8: ['Deep Learning', 'Quantum Computing Fundamentals', 'Blockchain Tech', 'Major Capstone Project']
    },
    colorScheme: {
      accent: '#0284c7', // sky-600
      bgGlow: 'rgba(2, 132, 199, 0.15)',
      border: 'rgba(56, 189, 248, 0.3)',
      text: '#38bdf8'
    }
  },
  {
    id: 'aids',
    name: 'Artificial Intelligence & Data Science',
    shortCode: 'AI & DS',
    iconName: 'Sparkles',
    description: 'Machine learning pipelines, deep learning, statistical inference, NLP, and big data architectures.',
    totalNotes: 36,
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    subjectsBySemester: {
      1: ['Engineering Mathematics I', 'Python for Problem Solving', 'Linear Algebra & Calculus', 'Physics for Computing'],
      2: ['Probability & Statistics for Engineers', 'Data Structures in Python', 'Digital Systems', 'Object Oriented Design'],
      3: ['Data Mining & Warehousing', 'Foundations of Machine Learning', 'Advanced Algorithms', 'R Programming & Visualization'],
      4: ['Deep Learning Architectures', 'Database Systems & NoSQL', 'Statistical Modeling', 'Computer Vision Foundations'],
      5: ['Natural Language Processing', 'Big Data Engineering (Spark/Hadoop)', 'AI Ethics & Governance', 'Reinforcement Learning'],
      6: ['MLOps & Pipeline Deployment', 'Generative AI & LLMs', 'Graph Neural Networks', 'Cloud AI Solutions'],
      7: ['Autonomous Robotics & Perception', 'Time Series Forecasting', 'Federated Learning', 'Elective Seminar'],
      8: ['Healthcare AI Applications', 'Financial Analytics', 'Capstone Project', 'Research Thesis']
    },
    colorScheme: {
      accent: '#8b5cf6', // purple-500
      bgGlow: 'rgba(139, 92, 246, 0.15)',
      border: 'rgba(167, 139, 250, 0.3)',
      text: '#a78bfa'
    }
  },
  {
    id: 'ece',
    name: 'Electronics & Communication',
    shortCode: 'ECE',
    iconName: 'Radio',
    description: 'VLSI design, digital signal processing, embedded IoT systems, microwave antennas, and communication protocols.',
    totalNotes: 32,
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    subjectsBySemester: {
      1: ['Calculus & Differential Equations', 'Engineering Chemistry', 'Elements of Electronics', 'C Programming'],
      2: ['Vector Calculus & Complex Analysis', 'Electronic Devices & Circuits', 'Network Theory & Synthesis', 'Signals & Systems'],
      3: ['Analog Circuit Design', 'Digital Electronics & Verilog', 'Electromagnetic Field Theory', 'Linear Integrated Circuits'],
      4: ['Digital Signal Processing', 'Microprocessors & Microcontrollers (8051/ARM)', 'Analog Communication', 'Control Systems'],
      5: ['Digital Communication Systems', 'VLSI Design & CMOS', 'Antennas & Wave Propagation', 'Embedded Systems'],
      6: ['Wireless & Cellular Networks (5G)', 'Optical Fiber Communication', 'Microwave Engineering', 'FPGA Prototyping'],
      7: ['Satellite Communication', 'RF Circuit Design', 'Biomedical Signal Processing', 'Radar Systems'],
      8: ['Internet of Things (IoT) Design', 'Robotics Hardware', 'Nanoelectronics', 'Senior Design Project']
    },
    colorScheme: {
      accent: '#10b981', // emerald-500
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      border: 'rgba(52, 211, 153, 0.3)',
      text: '#34d399'
    }
  },
  {
    id: 'me',
    name: 'Mechanical Engineering',
    shortCode: 'ME',
    iconName: 'Cog',
    description: 'Thermodynamics, fluid mechanics, CAD/CAM, finite element analysis, robotics, and thermal power plants.',
    totalNotes: 29,
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    subjectsBySemester: {
      1: ['Engineering Mathematics I', 'Engineering Mechanics', 'Material Science', 'Basic Mechanical Engineering'],
      2: ['Engineering Mathematics II', 'Computer Aided Drafting (CAD)', 'Manufacturing Technology I', 'Applied Thermodynamics'],
      3: ['Mechanics of Solids (Strength of Materials)', 'Kinematics of Machinery', 'Fluid Mechanics', 'Engineering Metallurgy'],
      4: ['Dynamics of Machinery', 'Fluid Power Engineering', 'Thermal Engineering', 'Manufacturing Technology II'],
      5: ['Design of Machine Elements I', 'Heat & Mass Transfer', 'Finite Element Analysis (FEA)', 'Metrology & Quality Control'],
      6: ['Design of Machine Elements II', 'Mechatronics & Automation', 'Internal Combustion Engines', 'Operations Research'],
      7: ['Refrigeration & Air Conditioning', 'Robotics & CNC Machining', 'Power Plant Engineering', 'Renewable Energy Systems'],
      8: ['Automobile Engineering', 'Total Quality Management', 'Additive Manufacturing (3D Printing)', 'Capstone Project']
    },
    colorScheme: {
      accent: '#f97316', // orange-500
      bgGlow: 'rgba(249, 115, 22, 0.15)',
      border: 'rgba(251, 146, 60, 0.3)',
      text: '#fb923c'
    }
  },
  {
    id: 'ee',
    name: 'Electrical Engineering',
    shortCode: 'EEE',
    iconName: 'Zap',
    description: 'Power systems, smart grids, electrical machines, high-voltage engineering, and renewable integration.',
    totalNotes: 24,
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    subjectsBySemester: {
      1: ['Engineering Mathematics I', 'Fundamentals of Electrical Sciences', 'Physics for Engineers', 'Workshop Practice'],
      2: ['Engineering Mathematics II', 'Circuit Analysis & Synthesis', 'Electromagnetic Theory', 'Electrical Measurements'],
      3: ['Electrical Machines I (DC & Transformers)', 'Analog Electronics', 'Signals & Systems', 'Power Generation Economics'],
      4: ['Electrical Machines II (AC Induction & Synch)', 'Power Systems I', 'Control Systems Engineering', 'Digital Systems'],
      5: ['Power Electronics', 'Power Systems II (Transmission & Faults)', 'Microcontrollers in Power', 'High Voltage Engineering'],
      6: ['Switchgear & Protection', 'Electric Drives & Traction', 'Smart Grid Technologies', 'Renewable Energy Sources'],
      7: ['Power System Operation & Control', 'Flexible AC Transmission (FACTS)', 'Substation Design', 'Industrial Automation'],
      8: ['Electric Vehicle Powertrain Design', 'Power Quality & Filters', 'Energy Auditing', 'Final Capstone Project']
    },
    colorScheme: {
      accent: '#eab308', // yellow-500
      bgGlow: 'rgba(234, 179, 8, 0.15)',
      border: 'rgba(250, 204, 21, 0.3)',
      text: '#facc15'
    }
  },
  {
    id: 'ce',
    name: 'Civil Engineering',
    shortCode: 'CE',
    iconName: 'Building2',
    description: 'Structural engineering, geotechnical analysis, concrete technology, hydraulics, and survey GIS.',
    totalNotes: 22,
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    subjectsBySemester: {
      1: ['Mathematics I', 'Engineering Mechanics', 'Building Materials & Construction', 'Engineering Graphics'],
      2: ['Mathematics II', 'Strength of Materials', 'Surveying & Geomatics', 'Fluid Mechanics for Civil'],
      3: ['Structural Analysis I', 'Concrete Technology', 'Hydrology & Water Resources', 'Geotechnical Engineering I (Soil)'],
      4: ['Structural Analysis II', 'Design of Concrete Structures (RCC)', 'Geotechnical Engineering II (Foundations)', 'Highway Engineering'],
      5: ['Design of Steel Structures', 'Environmental Engineering I', 'Transportation Engineering', 'Estimation & Costing'],
      6: ['Water Supply & Wastewater Treatment', 'Earthquake Resistant Design', 'Irrigation Engineering', 'Prestressed Concrete'],
      7: ['Bridge Engineering', 'Construction Management & BIM', 'Remote Sensing & GIS', 'Urban Planning'],
      8: ['Coastal & Offshore Structures', 'Ground Improvement Techniques', 'Tall Building Structures', 'Major Project']
    },
    colorScheme: {
      accent: '#14b8a6', // teal-500
      bgGlow: 'rgba(20, 184, 166, 0.15)',
      border: 'rgba(45, 212, 191, 0.3)',
      text: '#2dd4bf'
    }
  },
  {
    id: 'it',
    name: 'Information Technology',
    shortCode: 'IT',
    iconName: 'Terminal',
    description: 'Enterprise networks, full stack cloud architectures, secure software development, and big data storage.',
    totalNotes: 28,
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    subjectsBySemester: {
      1: ['Engineering Mathematics I', 'C Programming & Logic', 'Computer Concepts', 'Applied Physics'],
      2: ['Engineering Mathematics II', 'Data Structures & Algorithms', 'Web Development Fundamentals', 'Digital Principles'],
      3: ['Java & Object-Oriented Paradigms', 'Discrete Structures', 'Computer Architecture', 'Database Management Systems'],
      4: ['Operating Systems', 'Design & Analysis of Algorithms', 'Computer Networks', 'Automata Theory'],
      5: ['Full Stack Web Development', 'Information Security', 'Cloud Infrastructure (AWS/GCP)', 'Mobile Application Dev'],
      6: ['DevOps & CI/CD Pipelines', 'Distributed Data Systems', 'Data Science with Python', 'Software Testing & QA'],
      7: ['Cyber Forensics & Incident Response', 'Blockchain Systems', 'Enterprise Application Design', 'Microservices Architecture'],
      8: ['Virtual Reality & AR', 'Site Reliability Engineering', 'Cloud Native Security', 'Capstone Implementation']
    },
    colorScheme: {
      accent: '#06b6d4', // cyan-500
      bgGlow: 'rgba(6, 182, 212, 0.15)',
      border: 'rgba(34, 211, 238, 0.3)',
      text: '#22d3ee'
    }
  },
  {
    id: 'che',
    name: 'Chemical Engineering',
    shortCode: 'CHE',
    iconName: 'FlaskConical',
    description: 'Thermodynamics of fluids, reaction kinetics, mass transfer operations, process dynamics, and plant safety.',
    totalNotes: 18,
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    subjectsBySemester: {
      1: ['Engineering Mathematics I', 'Applied Chemistry', 'Physics of Matter', 'Intro to Chemical Engineering'],
      2: ['Engineering Mathematics II', 'Fluid Flow Operations', 'Organic Chemistry for Engineers', 'Material & Energy Balances'],
      3: ['Chemical Engineering Thermodynamics I', 'Mechanical Operations', 'Heat Transfer Operations', 'Chemical Technology'],
      4: ['Chemical Engineering Thermodynamics II', 'Mass Transfer Operations I', 'Chemical Reaction Engineering I', 'Process Instrumentation'],
      5: ['Mass Transfer Operations II', 'Chemical Reaction Engineering II', 'Process Dynamics & Control', 'Plant Utilities & Energy Audit'],
      6: ['Transport Phenomena', 'Process Equipment Design', 'Petrochemical Engineering', 'Process Safety & Hazard Analysis'],
      7: ['Polymer Technology', 'Biochemical Engineering', 'Industrial Pollution Control', 'Process Modeling & Simulation'],
      8: ['Nanotechnology in Catalysis', 'Economics of Chemical Plants', 'Electrochemical Engineering', 'Senior Project']
    },
    colorScheme: {
      accent: '#ec4899', // pink-500
      bgGlow: 'rgba(236, 72, 153, 0.15)',
      border: 'rgba(244, 114, 182, 0.3)',
      text: '#f472b6'
    }
  }
];

export const INITIAL_NOTES: Note[] = [
  {
    id: 'note-cse-sem4-os-complete',
    title: 'Operating Systems — Complete Exam Gold Notes (Units 1 to 5)',
    description: 'Comprehensive, high-yield classroom notes covering CPU Scheduling, Synchronization (Semaphores & Peterson Algorithm), Deadlocks (Banker Algorithm), Memory Management & Paging, and File Systems.',
    subject: 'Operating Systems',
    branch: 'CSE',
    branchId: 'cse',
    semester: 4,
    unit: 'Units 1-5 (Complete Syllabus)',
    noteType: 'Handwritten',
    author: {
      id: 'author-1',
      name: 'Priya Sharma',
      college: 'Indian Institute of Technology, Bombay',
      verified: true,
      badge: '9.8 CGPA Gold Medalist'
    },
    uploadDate: '2026-03-12',
    fileFormat: 'PDF',
    fileSize: '8.4 MB',
    pageCount: 38,
    downloadsCount: 3840,
    viewsCount: 12450,
    rating: 4.9,
    ratingCount: 312,
    tags: ['CPU Scheduling', 'Deadlocks', 'Banker Algorithm', 'Virtual Memory', 'Semaphores', 'Page Replacement'],
    tableOfContents: [
      'Unit 1: Introduction, Dual Mode Operation, System Calls',
      'Unit 2: Process Management, Threads & CPU Scheduling (FCFS, SJF, RR, Priority)',
      'Unit 3: Inter-Process Communication, Critical Section Problem & Semaphores',
      'Unit 4: Deadlocks: Coffman Conditions, Avoidance (Banker Algorithm) & Detection',
      'Unit 5: Memory Management: Paging, TLB, Segmentation, Demand Paging & Page Replacement (FIFO, LRU, Optimal)'
    ],
    samplePages: [
      {
        pageNumber: 1,
        title: 'CPU Scheduling Algorithms Comparison & Formulas',
        unit: 'Unit 2: Process Scheduling',
        content: [
          'Turnaround Time (TAT) = Completion Time (CT) - Arrival Time (AT)',
          'Waiting Time (WT) = Turnaround Time (TAT) - Burst Time (BT)',
          'Response Time (RT) = Time at which process gets CPU first - Arrival Time (AT)',
          'Shortest Job First (SJF) is provably optimal for minimizing Average Waiting Time. Preemptive SJF is also called Shortest Remaining Time First (SRTF).'
        ],
        keyFormulasOrCode: [
          'Avg WT = (Σ WT_i) / N',
          'SJF Preemptive Rule: If newly arrived BT < Remaining BT of running process -> Context Switch!',
          'Convoy Effect: Seen in FCFS when a long CPU-burst process monopolizes the processor while short I/O bound processes queue behind it.'
        ],
        examTips: [
          'High probability university question: 10-mark numerical comparing FCFS, Non-Preemptive SJF, and Round Robin (Quantum = 2ms). Always draw the Gantt chart clearly with time markers 0, 2, 5, etc.'
        ]
      },
      {
        pageNumber: 2,
        title: 'Process Synchronization & Peterson\'s Solution',
        unit: 'Unit 3: Concurrency',
        content: [
          'Critical Section Problem requires 3 mandatory criteria:',
          '1. Mutual Exclusion: If process P_i is executing in its critical section, no other process can execute.',
          '2. Progress: If no process is executing and some wish to enter, selection cannot be postponed indefinitely.',
          '3. Bounded Waiting: A bound must exist on the number of times other processes enter after a request is made.'
        ],
        keyFormulasOrCode: [
          '// Peterson Algorithm for two processes P0 and P1:',
          'boolean flag[2] = {false, false};',
          'int turn = 0;',
          '',
          '// Inside Process Pi (where j = 1 - i):',
          'flag[i] = true;',
          'turn = j;',
          'while (flag[j] && turn == j); // Busy wait',
          '/* CRITICAL SECTION */',
          'flag[i] = false; // Remainder section'
        ],
        examTips: [
          'Examiners love to ask whether Peterson Solution works on modern multicore CPUs with out-of-order execution (answer: requires memory fences/barriers).'
        ]
      },
      {
        pageNumber: 3,
        title: 'Banker\'s Algorithm for Deadlock Avoidance',
        unit: 'Unit 4: Deadlocks',
        content: [
          'The 4 Coffman Conditions necessary for Deadlock: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.',
          'Safety Algorithm Data Structures: Available[m], Max[n][m], Allocation[n][m], Need[n][m] where Need[i][j] = Max[i][j] - Allocation[i][j].'
        ],
        keyFormulasOrCode: [
          'Need Matrix Calculation: Need[i][j] = Max[i][j] - Allocation[i][j]',
          'Step: Find process P_i such that Finish[i] == false AND Need[i] <= Work',
          'Work = Work + Allocation[i]; Finish[i] = true;',
          'If all Finish[i] == true -> System is in a SAFE STATE.'
        ],
        examTips: [
          'Step-by-step table format included. Don\'t forget to show the Safe Sequence e.g. <P1, P3, P4, P0, P2>.'
        ]
      }
    ],
    syllabusCoverage: '100% University Syllabus (All 5 Units covered in depth)',
    examWeightageEstimate: 'Highest scoring core subject (typically 25 marks in GATE CS)'
  },
  {
    id: 'note-cse-sem3-dsa-trees',
    title: 'Data Structures & Algorithms: Trees, Graphs & Dynamic Programming',
    description: 'Crisp visual notes with AVL Tree Rotations, Dijkstra / Bellman-Ford comparisons, Red-Black tree invariants, and standard 0/1 Knapsack DP patterns with clean C++ and Python code.',
    subject: 'Data Structures & Algorithms',
    branch: 'CSE',
    branchId: 'cse',
    semester: 3,
    unit: 'Units 3 & 4: Trees, Graphs & DP',
    noteType: 'Typed Notes',
    author: {
      id: 'author-2',
      name: 'Aditya Sen',
      college: 'BITS Pilani',
      verified: true,
      badge: 'Codeforces Candidate Master'
    },
    uploadDate: '2026-02-28',
    fileFormat: 'PDF',
    fileSize: '5.6 MB',
    pageCount: 32,
    downloadsCount: 5120,
    viewsCount: 15300,
    rating: 5.0,
    ratingCount: 420,
    tags: ['AVL Trees', 'Dijkstra', 'Graph Algorithms', 'Dynamic Programming', 'C++', 'Time Complexity'],
    tableOfContents: [
      '1. Binary Search Trees & Balanced Trees (AVL Rotations LL, RR, LR, RL)',
      '2. Red-Black Tree Properties & Insertion Fixes',
      '3. Graph Representations (Adjacency Matrix vs List)',
      '4. Graph Traversals: BFS (Queue) & DFS (Stack/Recursion)',
      '5. Shortest Paths: Dijkstra (Greedy), Bellman-Ford (Negative Weights), Floyd-Warshall',
      '6. Minimum Spanning Trees: Kruskal\'s (Disjoint Set Union) & Prim\'s',
      '7. Dynamic Programming Templates: 0/1 Knapsack, LCS, LIS'
    ],
    samplePages: [
      {
        pageNumber: 1,
        title: 'AVL Tree Self-Balancing Rotations',
        unit: 'Trees & Balanced BSTs',
        content: [
          'Balance Factor (BF) = Height(Left Subtree) - Height(Right Subtree). An AVL tree guarantees |BF| <= 1 for every node.',
          'When an insertion causes |BF| > 1, one of 4 rotation cases applies:',
          '1. LL Case: Single Right Rotation about node A.',
          '2. RR Case: Single Left Rotation about node A.',
          '3. LR Case: Double rotation - Left rotate on left child B, then Right rotate on node A.',
          '4. RL Case: Double rotation - Right rotate on right child B, then Left rotate on node A.'
        ],
        keyFormulasOrCode: [
          'Height of AVL tree with n nodes: h <= 1.44 * log2(n + 2) - 0.328',
          'Lookup, Insertion, Deletion: O(log n) guaranteed worst case.',
          'Space Complexity: O(n)'
        ],
        examTips: [
          'University exams always provide an insertion sequence (e.g., 10, 20, 30, 40, 50, 25) and ask for the final tree after rotations with BF values marked beside each node.'
        ]
      },
      {
        pageNumber: 2,
        title: 'Dijkstra vs Bellman-Ford Shortest Path Algorithm',
        unit: 'Graph Algorithms',
        content: [
          'Dijkstra\'s Algorithm uses a Priority Queue (Min-Heap) and Greedy strategy. Fails with negative weight edges or cycles.',
          'Bellman-Ford relaxes all |E| edges (|V| - 1) times using Dynamic Programming. Can detect negative weight cycles in O(V * E).'
        ],
        keyFormulasOrCode: [
          'Dijkstra Time Complexity with Min-Heap: O((V + E) log V)',
          'Bellman-Ford Time Complexity: O(V * E)',
          'Edge Relaxation: if (dist[u] + weight(u, v) < dist[v]) { dist[v] = dist[u] + weight(u, v); }'
        ],
        examTips: [
          'If question asks "How to detect a negative cycle using Bellman-Ford?", state: Relax all edges one additional time (|V|-th iteration); if any distance decreases, a negative cycle exists.'
        ]
      }
    ],
    syllabusCoverage: 'Complete coverage of Advanced Non-linear Data Structures',
    examWeightageEstimate: 'Core subject, 30-35% in coding rounds and tech interviews'
  },
  {
    id: 'note-aids-sem5-ml-cheatsheet',
    title: 'Machine Learning & Neural Networks: Formula Sheet & Math Derivations',
    description: 'High-density formula sheet and handwritten math derivations for Gradient Descent, Backpropagation chain rule, Loss functions (Cross-Entropy, MSE), SVM Margins, and PCA eigenvectors.',
    subject: 'Foundations of Machine Learning',
    branch: 'AI & DS',
    branchId: 'aids',
    semester: 5,
    unit: 'Formula Sheet (All Units)',
    noteType: 'Formula Sheet',
    author: {
      id: 'author-3',
      name: 'Rohan Mehra',
      college: 'NIT Trichy',
      verified: true,
      badge: 'Data Scientist Intern @ Amazon'
    },
    uploadDate: '2026-03-01',
    fileFormat: 'PDF',
    fileSize: '3.9 MB',
    pageCount: 16,
    downloadsCount: 4210,
    viewsCount: 11200,
    rating: 4.9,
    ratingCount: 289,
    tags: ['Machine Learning', 'Backpropagation', 'PCA', 'SVM', 'Formula Sheet', 'Linear Regression'],
    tableOfContents: [
      '1. Loss Functions: MSE, Cross-Entropy, Huber Loss',
      '2. Optimizers: SGD, Momentum, RMSprop, Adam equations',
      '3. Support Vector Machines: Hard vs Soft Margin, Kernel Trick (RBF, Polynomial)',
      '4. Principal Component Analysis (Covariance matrix, SVD, Eigenvalues)',
      '5. Neural Network Backpropagation Calculus Derivation'
    ],
    samplePages: [
      {
        pageNumber: 1,
        title: 'Backpropagation Multi-Variable Calculus Derivations',
        unit: 'Neural Networks & Deep Learning',
        content: [
          'Forward pass for layer l: z^[l] = W^[l] * a^[l-1] + b^[l], with activation a^[l] = g^[l](z^[l])',
          'Using the chain rule of partial derivatives, we compute gradients with respect to weights and biases flowing backwards.'
        ],
        keyFormulasOrCode: [
          'dz^[l] = da^[l] * g\'^[l](z^[l])',
          'dW^[l] = (1/m) * dz^[l] * (a^[l-1])^T',
          'db^[l] = (1/m) * sum(dz^[l], axis=1, keepdims=True)',
          'da^[l-1] = (W^[l])^T * dz^[l]'
        ],
        examTips: [
          'Draw the computational graph clearly in the answer sheet showing arrows pointing backwards for gradients.'
        ]
      }
    ],
    syllabusCoverage: 'Full Semester Formula Handbook & Math Essentials',
    examWeightageEstimate: 'Crucial for End-Sem Theory & Semester Viva'
  },
  {
    id: 'note-ece-sem4-dsp-pyq',
    title: 'Digital Signal Processing: 5 Years Solved PYQs & Z-Transform Handbook',
    description: 'Step-by-step solved previous year university exam questions. Covers Z-Transform ROC properties, 8-Point Radix-2 FFT Butterfly diagrams, and Butterworth & Chebyshev IIR Filter Design.',
    subject: 'Digital Signal Processing',
    branch: 'ECE',
    branchId: 'ece',
    semester: 4,
    unit: 'PYQ Question Bank (2021-2025)',
    noteType: 'PYQ & Solutions',
    author: {
      id: 'author-4',
      name: 'Ananya Deshmukh',
      college: 'COEP Tech University, Pune',
      verified: true,
      badge: 'GATE ECE AIR 142'
    },
    uploadDate: '2026-02-15',
    fileFormat: 'PDF',
    fileSize: '9.2 MB',
    pageCount: 46,
    downloadsCount: 2950,
    viewsCount: 8840,
    rating: 4.8,
    ratingCount: 198,
    tags: ['DSP', 'FFT Butterfly', 'Z-Transform', 'Butterworth Filter', 'PYQ', 'Signals'],
    tableOfContents: [
      'Chapter 1: Discrete-Time Signals & LTI Systems (Convolution Sum & Stability)',
      'Chapter 2: Z-Transform: Region of Convergence (ROC) Rules & Inverse ZT',
      'Chapter 3: Discrete Fourier Transform (DFT) & Properties',
      'Chapter 4: Radix-2 Decimation-In-Time (DIT) & Decimation-In-Frequency (DIF) FFT Butterfly Diagrams',
      'Chapter 5: IIR Filter Design: Bilinear Transformation & Impulse Invariance',
      'Chapter 6: FIR Filter Design: Rectangular, Hamming, Hanning Window Techniques'
    ],
    samplePages: [
      {
        pageNumber: 1,
        title: '8-Point DIT-FFT Butterfly Computation Diagram',
        unit: 'Unit 4: Fast Fourier Transform',
        content: [
          'Radix-2 FFT decomposes N-point DFT into (N/2) point DFTs recursively.',
          'Total complex multiplications for Direct DFT = N^2 (64 for N=8).',
          'Total complex multiplications for Radix-2 FFT = (N/2) * log2(N) = 4 * 3 = 12 (Over 80% reduction!).',
          'Bit-reversal order for inputs: 0 (000), 4 (100), 2 (010), 6 (110), 1 (001), 5 (101), 3 (011), 7 (111).'
        ],
        keyFormulasOrCode: [
          'Twiddle Factor: W_N^k = e^(-j * 2 * π * k / N)',
          'Butterfly Equation: A\' = A + W_N^k * B, and B\' = A - W_N^k * B'
        ],
        examTips: [
          'Always show bit-reversal input sequence in Column 1, followed by Stage 1, Stage 2, and Stage 3 outputs. Don\'t forget the minus signs (-1) on the lower branch of each butterfly!'
        ]
      }
    ],
    syllabusCoverage: 'Past 5 Years Solved University Papers with Marking Scheme',
    examWeightageEstimate: 'Guaranteed 25 marks question on FFT Butterfly in every university paper'
  },
  {
    id: 'note-me-sem3-strength-materials',
    title: 'Mechanics of Solids / Strength of Materials — SFD & BMD Masterclass',
    description: 'Detailed hand-drawn Shear Force Diagrams (SFD) & Bending Moment Diagrams (BMD) for cantilever, simply supported, and overhanging beams with point loads, UDL, and UVL.',
    subject: 'Mechanics of Solids (Strength of Materials)',
    branch: 'ME',
    branchId: 'me',
    semester: 3,
    unit: 'Unit 2: SFD, BMD & Bending Stresses',
    noteType: 'Handwritten',
    author: {
      id: 'author-5',
      name: 'Karan Patel',
      college: 'VJTI Mumbai',
      verified: true,
      badge: 'Formula Specialist'
    },
    uploadDate: '2026-01-20',
    fileFormat: 'PDF',
    fileSize: '7.1 MB',
    pageCount: 30,
    downloadsCount: 3100,
    viewsCount: 9100,
    rating: 4.9,
    ratingCount: 245,
    tags: ['SFD', 'BMD', 'UDL', 'Strength of Materials', 'Bending Stress', 'Beam Theory'],
    tableOfContents: [
      '1. Types of Beams, Supports & Types of Loading',
      '2. Relation between Load (w), Shear Force (V), and Bending Moment (M)',
      '3. SFD & BMD for Simply Supported Beam with UDL and Point Loads',
      '4. Point of Contraflexure & Location of Maximum Bending Moment',
      '5. Theory of Pure Bending: Derivation of M/I = σ/y = E/R',
      '6. Section Modulus (Z) for Rectangular, Circular, and I-Sections'
    ],
    samplePages: [
      {
        pageNumber: 1,
        title: 'Sign Conventions & Golden Rules for SFD / BMD',
        unit: 'SFD & BMD Foundations',
        content: [
          'Rate of loading: dV/dx = -w',
          'Slope of Bending Moment curve: dM/dx = V',
          'Rule 1: Maximum Bending Moment occurs where Shear Force is zero (V = 0) or changes sign.',
          'Rule 2: Point of Contraflexure is the point where Bending Moment changes sign (M = 0).'
        ],
        keyFormulasOrCode: [
          'Euler-Bernoulli Bending Equation: M / I = σ / y = E / R',
          'Section Modulus Z = I / y_max',
          'Rectangular section Z = (b * d^2) / 6'
        ],
        examTips: [
          'If an exam question has an inclined load, always resolve it into vertical (V = P sin θ) and horizontal (H = P cos θ) components first!'
        ]
      }
    ],
    syllabusCoverage: '100% University Exam Pattern Compliant',
    examWeightageEstimate: 'SFD/BMD numerical alone carries 15-20 marks in Section B'
  },
  {
    id: 'note-cse-sem5-dbms-sql-nosql',
    title: 'Database Management Systems: SQL, Normalization (1NF to BCNF) & ACID',
    description: 'Clean typed lecture notes covering Relational Algebra, ER Modeling, Normal Forms with Functional Dependencies decomposition algorithms, Transaction ACID properties, and Concurrency Schedules.',
    subject: 'Database Management Systems',
    branch: 'CSE',
    branchId: 'cse',
    semester: 4,
    unit: 'Units 2 & 4: Normalization & Transactions',
    noteType: 'Typed Notes',
    author: {
      id: 'author-6',
      name: 'Siddharth Rao',
      college: 'IIIT Hyderabad',
      verified: true,
      badge: 'Backend Architect'
    },
    uploadDate: '2026-03-05',
    fileFormat: 'PDF',
    fileSize: '6.2 MB',
    pageCount: 34,
    downloadsCount: 3670,
    viewsCount: 10400,
    rating: 4.9,
    ratingCount: 260,
    tags: ['DBMS', 'SQL', 'BCNF', 'Normalization', 'ACID Properties', 'Transactions'],
    tableOfContents: [
      '1. Three-Schema Architecture & Data Independence',
      '2. Relational Algebra Operations (Select, Project, Cartesian Product, Joins)',
      '3. Functional Dependencies & Attribute Closure Algorithm',
      '4. Normalization: 1NF, 2NF, 3NF, BCNF, Dependency Preservation & Lossless Join',
      '5. Transaction Management: ACID Properties & State Diagram',
      '6. Concurrency Control: Serializability (Conflict vs View), Two-Phase Locking (2PL)'
    ],
    samplePages: [
      {
        pageNumber: 1,
        title: 'Normalization Rules & BCNF vs 3NF Comparison',
        unit: 'Unit 3: Normalization',
        content: [
          '1NF: Attributes must contain atomic values only; no multi-valued or composite attributes.',
          '2NF: Must be in 1NF AND no non-prime attribute is partially dependent on any candidate key.',
          '3NF: Must be in 2NF AND for every functional dependency X -> Y, either X is a Super Key OR Y is a Prime Attribute (no transitive dependency).',
          'BCNF: For every functional dependency X -> Y, X must be a Super Key.'
        ],
        keyFormulasOrCode: [
          'Attribute Closure (X+):',
          'Step 1: X+ = X',
          'Step 2: Repeat until no more attributes can be added: if A -> B and A ⊆ X+, then X+ = X+ ∪ B',
          'If X+ contains all attributes of R -> X is a Super Key!'
        ],
        examTips: [
          'BCNF does NOT always guarantee dependency preservation, but 3NF always guarantees both lossless join and dependency preservation. This is a very common viva question.'
        ]
      }
    ],
    syllabusCoverage: 'Covers entire university syllabus + GATE CS syllabus',
    examWeightageEstimate: 'Core subject with 15-20 marks weightage'
  },
  {
    id: 'note-ee-sem4-control-systems',
    title: 'Control Systems Engineering: Root Locus, Bode Plots & Nyquist Criterion',
    description: 'Practical calculation guides with graph paper templates, angle of asymptotes, breakaway points, gain margin & phase margin formulas, and state space matrices.',
    subject: 'Control Systems Engineering',
    branch: 'EEE',
    branchId: 'ee',
    semester: 4,
    unit: 'Units 3 & 4: Frequency Response Analysis',
    noteType: 'Handwritten',
    author: {
      id: 'author-7',
      name: 'Deepak Krishnan',
      college: 'National Institute of Technology, Calicut',
      verified: true,
      badge: 'GATE EEE Ranker'
    },
    uploadDate: '2026-02-18',
    fileFormat: 'PDF',
    fileSize: '7.8 MB',
    pageCount: 36,
    downloadsCount: 2190,
    viewsCount: 7100,
    rating: 4.7,
    ratingCount: 165,
    tags: ['Control Systems', 'Root Locus', 'Bode Plot', 'Nyquist', 'Stability', 'Transfer Function'],
    tableOfContents: [
      '1. Transfer Function & Block Diagram Reduction Rules',
      '2. Mason\'s Gain Formula with Signal Flow Graphs',
      '3. Time Response Analysis (Damping Ratio ζ, Natural Frequency ω_n, Rise Time, Settling Time)',
      '4. Routh-Hurwitz Stability Criterion & Special Cases',
      '5. Root Locus Construction Rules (Asymptotes, Centroid, Breakaway Points, Angle of Departure)',
      '6. Frequency Response: Bode Plots (Gain Margin & Phase Margin) and Nyquist Stability Criterion'
    ],
    samplePages: [
      {
        pageNumber: 1,
        title: 'Bode Plot Construction & Stability Margins',
        unit: 'Frequency Response',
        content: [
          'Gain Crossover Frequency (ω_gc): Frequency where Magnitude |G(jω)H(jω)| = 0 dB.',
          'Phase Crossover Frequency (ω_pc): Frequency where Phase ∠G(jω)H(jω) = -180°.',
          'Phase Margin (PM) = 180° + ∠G(jω_gc)H(jω_gc)',
          'Gain Margin (GM) = -20 * log10 |G(jω_pc)H(jω_pc)| in dB'
        ],
        keyFormulasOrCode: [
          'For a stable system: ω_gc < ω_pc (Both GM > 0 dB and PM > 0°).',
          'For marginally stable: ω_gc = ω_pc (GM = 0 dB, PM = 0°).',
          'For unstable: ω_gc > ω_pc (GM < 0 dB or PM < 0°).'
        ],
        examTips: [
          'Bring semi-log graph sheet to exam hall. Show corner frequencies clearly on log-scale x-axis.'
        ]
      }
    ],
    syllabusCoverage: 'Full Semester Control Systems Theory & Lab Guide',
    examWeightageEstimate: 'Essential paper in EE, ECE and ME curriculum'
  },
  {
    id: 'note-ce-sem4-rcc-structures',
    title: 'Design of Reinforced Concrete Structures (RCC) — IS 456:2000 Code Handbook',
    description: 'Step-by-step design procedures according to Indian Standard Code IS 456:2000 for singly reinforced beams, doubly reinforced beams, one-way slabs, two-way slabs, and short axially loaded columns.',
    subject: 'Design of Concrete Structures (RCC)',
    branch: 'CE',
    branchId: 'ce',
    semester: 4,
    unit: 'Units 1-3: Limit State Design of Beams & Slabs',
    noteType: 'Formula Sheet',
    author: {
      id: 'author-8',
      name: 'Vikas Jadhav',
      college: 'Government College of Engineering, Pune',
      verified: true,
      badge: 'Licensed Structural Consultant'
    },
    uploadDate: '2026-02-10',
    fileFormat: 'PDF',
    fileSize: '5.2 MB',
    pageCount: 26,
    downloadsCount: 1890,
    viewsCount: 5600,
    rating: 4.8,
    ratingCount: 142,
    tags: ['RCC Design', 'IS 456', 'Limit State Method', 'Concrete', 'Civil Engineering', 'Slab Design'],
    tableOfContents: [
      '1. Limit State Philosophy (Limit State of Collapse vs Serviceability)',
      '2. Stress-Strain Block Parameters for Concrete and Steel',
      '3. Limiting Depth of Neutral Axis (x_u,max / d for Fe 250, Fe 415, Fe 500)',
      '4. Design of Singly Reinforced Rectangular Beams for Flexure',
      '5. Design for Shear Reinforcement (Vertical Stirrups & Spacing)',
      '6. One-Way Slab vs Two-Way Slab (Rankine-Grashoff & IS Code Coefficients)'
    ],
    samplePages: [
      {
        pageNumber: 1,
        title: 'Limit State of Collapse — Flexure Formulas (IS 456)',
        unit: 'Beam Design',
        content: [
          'Concrete Compressive Force C = 0.36 * f_ck * b * x_u',
          'Steel Tensile Force T = 0.87 * f_y * A_st',
          'Lever Arm z = d - 0.42 * x_u',
          'Moment of Resistance M_u = 0.36 * f_ck * b * x_u * (d - 0.42 * x_u)'
        ],
        keyFormulasOrCode: [
          'Limiting values of x_u,max / d:',
          '• Fe 250: 0.53',
          '• Fe 415: 0.48',
          '• Fe 500: 0.46',
          'Limiting Moment of Resistance for Fe 415: M_u,lim = 0.138 * f_ck * b * d^2'
        ],
        examTips: [
          'Check if section is Under-reinforced (x_u < x_u,max). Under-reinforced sections provide ductile warning before failure and are always preferred!'
        ]
      }
    ],
    syllabusCoverage: 'Full code-based design handbook for Limit State Method',
    examWeightageEstimate: 'Highest scoring design course in Civil Engineering'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    noteId: 'note-cse-sem4-os-complete',
    userId: 'user-201',
    userName: 'Kunal Chaudhari',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
    userCollege: 'Vellore Institute of Technology',
    rating: 5,
    comment: 'Saved my semester! The Banker Algorithm step-by-step table and CPU scheduling Gantt charts were identical to questions in my end-sem paper.',
    date: '2026-03-20',
    helpfulCount: 48
  },
  {
    id: 'rev-2',
    noteId: 'note-cse-sem4-os-complete',
    userId: 'user-202',
    userName: 'Aarav Patel',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop',
    userCollege: 'IIT Delhi',
    rating: 5,
    comment: 'Handwriting is crystal clear, and the Peterson algorithm section explained memory barriers better than our professor.',
    date: '2026-03-24',
    helpfulCount: 32
  },
  {
    id: 'rev-3',
    noteId: 'note-cse-sem3-dsa-trees',
    userId: 'user-203',
    userName: 'Sneha Rao',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
    userCollege: 'PES University, Bangalore',
    rating: 5,
    comment: 'The AVL rotation diagram with tree nodes before & after is the best visualization I have seen. A must-read before coding rounds.',
    date: '2026-03-18',
    helpfulCount: 56
  },
  {
    id: 'rev-4',
    noteId: 'note-aids-sem5-ml-cheatsheet',
    userId: 'user-204',
    userName: 'Tanmay Joshi',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop',
    userCollege: 'DTU Delhi',
    rating: 5,
    comment: 'Printed this out on 8 pages and carried it right up to the exam gate. Backprop derivation calculus steps are 100% airtight.',
    date: '2026-03-26',
    helpfulCount: 29
  }
];

export const INITIAL_USER: User = {
  id: 'current-user-kunal',
  name: 'Kunal Chaudhari',
  email: 'kunalchaudhari2008@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop',
  college: 'National Institute of Technology',
  branch: 'Computer Science & Engineering',
  semester: 4,
  reputationPoints: 480,
  bookmarks: ['note-cse-sem4-os-complete', 'note-cse-sem3-dsa-trees'],
  uploadedNotesCount: 2,
  downloadHistory: [
    {
      noteId: 'note-cse-sem4-os-complete',
      downloadedAt: '2026-03-22T10:14:00Z',
      noteTitle: 'Operating Systems — Complete Exam Gold Notes (Units 1 to 5)',
      subject: 'Operating Systems'
    },
    {
      noteId: 'note-aids-sem5-ml-cheatsheet',
      downloadedAt: '2026-03-28T16:45:00Z',
      noteTitle: 'Machine Learning & Neural Networks: Formula Sheet & Math Derivations',
      subject: 'Foundations of Machine Learning'
    }
  ],
  badges: [
    {
      id: 'badge-1',
      name: 'Scholar Contributor',
      icon: 'Award',
      description: 'Shared 2+ verified academic notes with university peers',
      unlockedAt: '2026-02-14'
    },
    {
      id: 'badge-2',
      name: 'Knowledge Seeker',
      icon: 'BookOpen',
      description: 'Downloaded and studied 10+ high-yield engineering notes',
      unlockedAt: '2026-03-01'
    },
    {
      id: 'badge-3',
      name: 'Top Rated Peer',
      icon: 'Star',
      description: 'Received a 4.8+ average rating across your contributions',
      unlockedAt: '2026-03-20'
    }
  ]
};
