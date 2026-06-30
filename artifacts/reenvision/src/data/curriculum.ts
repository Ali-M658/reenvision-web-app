// TODO: backend hooks here — replace this static data with API calls

export interface QuizQuestion {
  id: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Unit {
  id: number;
  title: string;
  description: string;
  duration: string;
  state: "completed" | "in-progress" | "available";
  questions: QuizQuestion[];
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  unitCount: number;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  units: Unit[];
}

export const COURSES: Course[] = [
  {
    id: 1,
    slug: "intro-to-ai",
    title: "Intro to AI",
    subtitle: "Structure & Function",
    description:
      "Understand how AI actually works under the hood — pattern matching, training, and why it says what it says.",
    unitCount: 7,
    color: "#7C3AED",
    gradientFrom: "from-violet-500",
    gradientTo: "to-purple-700",
    units: [
      {
        id: 101,
        title: "What AI Actually Is",
        description: "AI vs. magic: pattern matching, not thinking. A brief history and why even creators don't fully know why a model says what it says.",
        duration: "4 min",
        state: "completed",
        questions: [
          {
            id: 1,
            prompt: "AI is best described as a system that _____ to produce outputs.",
            options: ["Thinks creatively", "Matches patterns in data", "Follows hardcoded rules", "Randomly generates text"],
            correctIndex: 1,
            explanation: "AI uses statistical pattern matching from training data — it doesn't think or follow rules the way early software did.",
          },
          {
            id: 2,
            prompt: "Why is modern AI called a 'black box'?",
            options: ["It runs in the dark", "Even its creators can't fully explain every decision it makes", "It hides user data", "It only works offline"],
            correctIndex: 1,
            explanation: "Neural networks are so complex that even researchers struggle to explain exactly why a model produces a specific output.",
          },
        ],
      },
      {
        id: 102,
        title: "How Models 'Read'",
        description: "Tokens, not words — why AI breaks language into pieces, why typos change answers, and what a context window is.",
        duration: "5 min",
        state: "completed",
        questions: [
          {
            id: 1,
            prompt: "What is a 'token' in the context of AI language models?",
            options: ["A full sentence", "A piece of text (often a word or part of a word)", "A user's login credential", "A database entry"],
            correctIndex: 1,
            explanation: "Tokens are the chunks AI actually processes — they're often words or word-pieces, not full sentences or characters.",
          },
          {
            id: 2,
            prompt: "What happens when you exceed an AI model's context window?",
            options: ["The app crashes", "The AI refuses to answer", "The AI 'forgets' earlier parts of the conversation", "The response gets shorter"],
            correctIndex: 2,
            explanation: "Context windows have a fixed size — once exceeded, earlier content drops out, which is why AI can seem to forget earlier messages.",
          },
        ],
      },
      {
        id: 103,
        title: "How Models Learn",
        description: "Training on examples (not rules), what a dataset is, why biased data equals biased AI, and what 'parameters' means.",
        duration: "6 min",
        state: "in-progress",
        questions: [
          {
            id: 1,
            prompt: "AI models learn by _____, not by being given explicit rules.",
            options: ["Being programmed step by step", "Finding patterns in large amounts of example data", "Reading a dictionary", "Connecting to the internet"],
            correctIndex: 1,
            explanation: "Unlike traditional software, AI learns from examples — a process called training — rather than following rules a programmer wrote.",
          },
          {
            id: 2,
            prompt: "If your training data is biased, your AI model will be ___.",
            options: ["More accurate", "Unaffected", "Biased in the same way", "Automatically corrected"],
            correctIndex: 2,
            explanation: "AI inherits the biases of its training data — garbage in, garbage out. This is one of the most important ethics issues in AI.",
          },
        ],
      },
      {
        id: 104,
        title: "Why AI Answers the Way It Does",
        description: "Probability, not certainty — predicting the next likely word, why the same question gets different answers, and what 'temperature' means.",
        duration: "5 min",
        state: "available",
        questions: [
          {
            id: 1,
            prompt: "When an AI responds to a prompt, it is fundamentally doing what?",
            options: ["Looking up a database answer", "Predicting the most likely next token", "Searching the internet", "Following a decision tree"],
            correctIndex: 1,
            explanation: "Language models predict the statistically most likely next token based on the context — that's the core mechanism behind everything they do.",
          },
        ],
      },
      {
        id: 105,
        title: "Where AI Breaks",
        description: "Hallucination (confident but wrong), why AI is bad at math, why it doesn't know today's news, and how to spot a mistake.",
        duration: "5 min",
        state: "available",
        questions: [
          {
            id: 1,
            prompt: "What is an AI 'hallucination'?",
            options: ["When AI generates images", "When AI confidently states something false", "When AI repeats itself", "When AI refuses to answer"],
            correctIndex: 1,
            explanation: "Hallucination means the AI generates plausible-sounding but incorrect information with full confidence — a major risk when using AI for facts.",
          },
        ],
      },
      {
        id: 106,
        title: "Algorithms in Your Life",
        description: "How a content feed picks what you see, personalization vs. manipulation, and recommendation systems in shopping, search, and music.",
        duration: "6 min",
        state: "available",
        questions: [
          {
            id: 1,
            prompt: "A recommendation algorithm's primary goal is to maximize your ___.",
            options: ["Learning", "Happiness", "Engagement (time on platform)", "Privacy"],
            correctIndex: 2,
            explanation: "Recommendation systems are optimized for engagement metrics — not for your wellbeing or accuracy. Understanding this changes how you interact with feeds.",
          },
        ],
      },
      {
        id: 107,
        title: "Wrap-Up & Mindset",
        description: "Critical trust: when to believe AI, when to double-check. AI as a tool vs. an authority. Ethics basics and the capstone challenge.",
        duration: "7 min",
        state: "available",
        questions: [
          {
            id: 1,
            prompt: "The best mindset when using AI is to treat it as ___.",
            options: ["An infallible expert", "A tool to augment your thinking", "A replacement for research", "A trusted friend"],
            correctIndex: 1,
            explanation: "AI is a powerful tool — but you're the one responsible for verifying its output, thinking critically, and making final decisions.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "prompting",
    title: "Prompting Effectively",
    subtitle: "Talk to AI Like a Pro",
    description:
      "Learn the 'why' behind great prompts so good prompting becomes intuitive — not just a list of tips to memorize.",
    unitCount: 7,
    color: "#0EA5E9",
    gradientFrom: "from-sky-500",
    gradientTo: "to-blue-700",
    units: [
      {
        id: 201,
        title: "Basics of a Good Prompt",
        description: "Vague vs. specific with side-by-side comparisons. Telling AI who it should 'be'. Saying what you DON'T want.",
        duration: "5 min",
        state: "available",
        questions: [
          {
            id: 1,
            prompt: "Which prompt is most likely to get a useful response?",
            options: [
              "Tell me about dogs",
              "In 3 bullet points, explain the top health benefits of owning a dog, written for a 10-year-old",
              "Dogs",
              "What do you know about dogs?"
            ],
            correctIndex: 1,
            explanation: "Specific prompts with format instructions, audience, and constraints get dramatically better results than vague ones.",
          },
        ],
      },
      {
        id: 202,
        title: "Giving Context",
        description: "Why 'explain this' fails and 'explain this like I'm 10' works. Background info, few-shot prompting simplified.",
        duration: "5 min",
        state: "available",
        questions: [
          {
            id: 1,
            prompt: "Giving the AI context before your question is like ___.",
            options: [
              "Wasting tokens",
              "Briefing a new employee before asking them to do a task",
              "Making the response longer unnecessarily",
              "Confusing the AI"
            ],
            correctIndex: 1,
            explanation: "AI has no prior knowledge of your situation — providing context is how you help it give you a relevant, accurate answer.",
          },
        ],
      },
      {
        id: 203,
        title: "Controlling the Output",
        description: "Asking for lists, steps, or specific formats. Setting length. Asking for multiple options instead of one answer.",
        duration: "4 min",
        state: "available",
        questions: [],
      },
      {
        id: 204,
        title: "Iterating and Refining",
        description: "Treating AI like a conversation, not a vending machine. Follow-up prompts. Catching when AI misunderstood you.",
        duration: "6 min",
        state: "available",
        questions: [],
      },
      {
        id: 205,
        title: "Thinking Step-by-Step",
        description: "Breaking a big task into smaller prompts. Asking AI to 'show its work'. Why step-by-step prompts reduce mistakes.",
        duration: "5 min",
        state: "available",
        questions: [],
      },
      {
        id: 206,
        title: "Spotting and Fixing AI Mistakes",
        description: "Fact-checking AI output. Asking AI to double-check itself. Applying hallucination lessons from Course 1.",
        duration: "5 min",
        state: "available",
        questions: [],
      },
      {
        id: 207,
        title: "Capstone Project",
        description: "Plan a real task using AI — draft prompts, get outputs, refine based on what went wrong, present your final result.",
        duration: "10 min",
        state: "available",
        questions: [],
      },
    ],
  },
  {
    id: 3,
    slug: "sandbox",
    title: "AI/ML Sandbox",
    subtitle: "Build Your Own Model",
    description:
      "Get hands-on — train a real classifier, break it, improve it, and understand bias by experiencing it firsthand.",
    unitCount: 6,
    color: "#10B981",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-700",
    units: [
      {
        id: 301,
        title: "What 'Training a Model' Means",
        description: "Data in, patterns out — a recap from Course 1. What a classifier is. Tour of the sandbox interface.",
        duration: "5 min",
        state: "available",
        questions: [],
      },
      {
        id: 302,
        title: "Building Your First Model",
        description: "Pick a simple task, collect/upload example data, train a basic 2-category classifier in the sandbox.",
        duration: "8 min",
        state: "available",
        questions: [],
      },
      {
        id: 303,
        title: "Testing and Breaking Your Model",
        description: "Testing with new examples. Why models get things wrong. Spotting bias in your own training data.",
        duration: "6 min",
        state: "available",
        questions: [],
      },
      {
        id: 304,
        title: "Improving Your Model",
        description: "Adding more/better data. Balancing categories. Re-testing after changes.",
        duration: "6 min",
        state: "available",
        questions: [],
      },
      {
        id: 305,
        title: "Real-World Tie-In",
        description: "Where classifiers show up in real life. Ethics: what happens when a real classifier is biased.",
        duration: "5 min",
        state: "available",
        questions: [],
      },
      {
        id: 306,
        title: "Capstone Build",
        description: "Choose an original idea. Build and train it. Test and refine. Present your model using Course 1 + 2 vocabulary.",
        duration: "12 min",
        state: "available",
        questions: [],
      },
    ],
  },
];
