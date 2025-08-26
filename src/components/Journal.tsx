import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, Sparkles, Send, Lightbulb, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface JournalEntry {
  id: string;
  content: string;
  mood: string;
  date: string;
  aiInsights?: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      content: "Today I feel grateful for the small moments of peace. The way the sunlight filtered through my window this morning reminded me to slow down and appreciate the present. I'm proud of how I handled that difficult conversation at work - staying calm and listening instead of reacting immediately.",
      mood: "😌",
      date: "2024-01-15",
      aiInsights: "Your reflection shows emotional intelligence and mindfulness. The way you describe finding peace in simple moments suggests a growing appreciation for presence."
    },
    {
      id: "2",
      content: "Finally understood that complex React concept I've been struggling with. It's amazing how things click when you step back and approach them from a different angle. This small win reminded me that persistence pays off, even when learning feels overwhelming.",
      mood: "🌱",
      date: "2024-01-14",
      aiInsights: "This breakthrough reflects excellent problem-solving skills. Your ability to shift perspective when stuck is a valuable learning strategy."
    },
  ]);

  const [currentEntry, setCurrentEntry] = useState("");
  const [currentMood, setCurrentMood] = useState("😌");
  const [showAIInsights, setShowAIInsights] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const moodOptions = ["🌞", "😌", "🌱", "😴", "🔥"];

  const reflectionPrompts = [
    "What's one thing you're proud of today?",
    "How did your day move you closer to your goal?",
    "What's a small win you had today?",
    "What challenged you and how did you grow from it?",
    "What are you grateful for right now?"
  ];

  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    // Rotate prompts every 10 seconds
    const interval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % reflectionPrompts.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [reflectionPrompts.length]);

  // Dynamic insights based on user's writing patterns
  const getDynamicInsight = () => {
    if (entries.length === 0) {
      return "Start your reflection journey today! Every entry helps build self-awareness and growth.";
    } else if (entries.length < 3) {
      return "Great start! You're building a foundation for mindful reflection. Keep going!";
    } else if (entries.length < 7) {
      return "You're developing a consistent reflection habit. This practice will deepen your self-understanding.";
    } else {
      return "Impressive consistency! You're creating a valuable record of your growth journey.";
    }
  };

  const getMoodInsight = () => {
    const recentMoods = entries.slice(0, 3).map(entry => entry.mood);
    const positiveMoods = recentMoods.filter(mood => ['🌞', '😌', '🌱'].includes(mood));
    
    if (positiveMoods.length >= 2) {
      return "Your recent reflections show a positive mindset. This energy will fuel your growth!";
    } else if (recentMoods.includes('😴') || recentMoods.includes('🔥')) {
      return "You're experiencing varied emotions. Remember, all feelings are valid and can lead to growth.";
    } else {
      return "Your mood patterns show emotional awareness. This self-reflection is building emotional intelligence.";
    }
  };

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [currentEntry]);

  const handleSaveEntry = () => {
    if (currentEntry.trim()) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        content: currentEntry,
        mood: currentMood,
        date: new Date().toISOString().split("T")[0],
        aiInsights: "Your reflection shows deep self-awareness and growth mindset. Keep nurturing this practice of mindful observation."
      };
      setEntries([entry, ...entries]);
      setCurrentEntry("");
      setCurrentMood("😌");
      setShowAIInsights(true);
      
      // Hide AI insights after 5 seconds
      setTimeout(() => setShowAIInsights(false), 5000);
    }
  };

  const handlePublishEntry = () => {
    if (currentEntry.trim()) {
      handleSaveEntry();
      // Future: Share to community
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold font-sora rem-text-gradient mb-3">
          Reflection Pool 🌸
        </h1>
        <p className="text-stone-600 font-plus-jakarta text-lg">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* AI Reflection Prompt */}
      <div className="mb-8 animate-fade-in">
        <div className="bg-gradient-to-r from-sage-100 to-lavender-100 p-6 rounded-3xl border border-sage-200 shadow-soft">
          <div className="flex items-start space-x-3">
            <Lightbulb className="h-6 w-6 text-sage-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sage-800 mb-2 font-sora">
                Today's Reflection Guide
              </h3>
              <p className="text-sage-700 font-plus-jakarta text-lg leading-relaxed">
                {reflectionPrompts[currentPromptIndex]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Writing Area */}
      <div className="bg-white rounded-3xl shadow-floating border border-sage-100 p-8 mb-8 animate-fade-in">
        <Textarea
          ref={textareaRef}
          placeholder="Start writing your thoughts... Let your mind flow freely. There are no rules here, just honest reflection."
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          className="w-full min-h-[600px] border-0 text-lg text-stone-700 font-plus-jakarta leading-relaxed resize-none focus:ring-0 focus:outline-none placeholder:text-stone-400"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        />
      </div>

      {/* Mood Selector */}
      <div className="flex justify-center mb-8 animate-fade-in">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-soft border border-sage-100">
          <div className="flex space-x-3">
            {moodOptions.map((mood) => (
              <button
                key={mood}
                onClick={() => setCurrentMood(mood)}
                className={cn(
                  "text-2xl p-2 rounded-xl transition-all duration-200 hover:scale-110",
                  currentMood === mood 
                    ? "bg-sage-100 shadow-soft" 
                    : "hover:bg-sage-50"
                )}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 animate-fade-in">
        <Button
          onClick={handleSaveEntry}
          disabled={!currentEntry.trim()}
          className="rem-accent hover:from-sage-500 hover:to-lavender-500 text-white rounded-2xl px-8 py-3 shadow-soft hover:shadow-floating transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Reflection
        </Button>
        <Button
          onClick={handlePublishEntry}
          disabled={!currentEntry.trim()}
          variant="outline"
          className="border-sage-200 hover:bg-sage-50 text-sage-700 rounded-2xl px-8 py-3 shadow-soft hover:shadow-floating transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5 mr-2" />
          Share
        </Button>
      </div>

      {/* AI Insights Section */}
      <div className="mt-12 mb-8 animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-sora rem-text-gradient mb-3">
            AI-Powered Insights ✨
          </h2>
          <p className="text-stone-600 font-plus-jakarta">
            Discover patterns and get personalized recommendations from your reflections
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Progress Patterns */}
          <div className="bg-gradient-to-br from-sage-50 to-emerald-50 p-6 rounded-3xl border border-sage-200 shadow-soft">
            <div className="flex items-start space-x-3">
              <div className="bg-sage-100 p-3 rounded-2xl">
                <TrendingUp className="h-6 w-6 text-sage-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sage-800 mb-2 font-sora">Progress Patterns</h3>
                <p className="text-sage-700 font-plus-jakarta leading-relaxed">
                  {getDynamicInsight()}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-lavender-50 to-pink-50 p-6 rounded-3xl border border-lavender-200 shadow-soft">
            <div className="flex items-start space-x-3">
              <div className="bg-lavender-100 p-3 rounded-2xl">
                <Lightbulb className="h-6 w-6 text-lavender-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lavender-800 mb-2 font-sora">Recommendations</h3>
                <p className="text-lavender-700 font-plus-jakarta leading-relaxed">
                  Consider setting a weekly reflection goal. Your entries about learning breakthroughs could inspire others in your community.
                </p>
              </div>
            </div>
          </div>

          {/* Emotional Insights */}
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 p-6 rounded-3xl border border-sky-200 shadow-soft">
            <div className="flex items-start space-x-3">
              <div className="bg-sky-100 p-3 rounded-2xl">
                <Sparkles className="h-6 w-6 text-sky-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sky-800 mb-2 font-sora">Emotional Insights</h3>
                <p className="text-sky-700 font-plus-jakarta leading-relaxed">
                  {getMoodInsight()}
                </p>
              </div>
            </div>
          </div>

          {/* Community Insights */}
          <div className="bg-gradient-to-br from-peach-50 to-orange-50 p-6 rounded-3xl border border-peach-200 shadow-soft">
            <div className="flex items-start space-x-3">
              <div className="bg-peach-100 p-3 rounded-2xl">
                <Users className="h-6 w-6 text-peach-600" />
              </div>
              <div>
                <h3 className="font-semibold text-peach-800 mb-2 font-sora">Community Insights</h3>
                <p className="text-peach-700 font-plus-jakarta leading-relaxed">
                  Your learning journey could help others. Consider sharing insights in your study group rooms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Toast */}
      {showAIInsights && (
        <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-floating border border-sage-200 p-4 max-w-sm animate-fade-in z-50">
          <div className="flex items-start space-x-3">
            <Sparkles className="h-5 w-5 text-sage-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sage-800 mb-1">AI Reflection</h4>
              <p className="text-sm text-sage-700">
                Your reflection shows deep self-awareness and growth mindset. Keep nurturing this practice of mindful observation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Entries Preview */}
      {entries.length > 0 && (
        <div className="fixed bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-floating border border-sage-100 p-4 max-w-xs animate-fade-in">
          <h4 className="font-semibold text-sage-800 mb-3 text-sm">Recent Reflections</h4>
          <div className="space-y-3">
            {entries.slice(0, 2).map((entry) => (
              <div key={entry.id} className="text-xs">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{entry.mood}</span>
                  <span className="text-sage-600 font-medium">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-stone-600 line-clamp-2 leading-relaxed">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;
