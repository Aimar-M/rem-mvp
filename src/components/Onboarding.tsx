import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface OnboardingData {
  name: string;
  bigBloom: string;
  motivation: string;
  growthAreas: string[];
}

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    bigBloom: "",
    motivation: "",
    growthAreas: [],
  });
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const steps = [
    {
      id: "welcome",
      title: "Welcome to your growth garden! 🌱",
      subtitle: "Let's plant some seeds together",
    },
    {
      id: "name",
      title: "What should we call you?",
      subtitle: "Your name will help us personalize your journey",
    },
    {
      id: "bloom",
      title: `Hey ${data.name || "friend"}, what's your next big bloom?`,
      subtitle: "Your project is a seed 🌱 — let's plant it.",
    },
    {
      id: "motivation",
      title: "What's growing this dream?",
      subtitle: "Tell us what's inspiring this journey 🌸",
    },
    {
      id: "areas",
      title: "Where do you want to flourish?",
      subtitle: "Pick the gardens where you'll grow",
    },
    {
      id: "complete",
      title: "Your garden is ready to bloom! 🌺",
      subtitle: "Time to start growing",
    },
  ];

  const growthOptions = [
    { id: "creativity", label: "Creative Projects", emoji: "🎨" },
    { id: "wellness", label: "Wellness & Self-Care", emoji: "🧘‍♀️" },
    { id: "learning", label: "Learning & Skills", emoji: "📚" },
    { id: "career", label: "Career Growth", emoji: "🚀" },
    { id: "relationships", label: "Relationships", emoji: "💝" },
    { id: "adventure", label: "Adventures & Travel", emoji: "✈️" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    // Update user profile with onboarding data
    updateProfile({
      name: data.name,
      bio: `Growing towards: ${data.bigBloom}`,
    });

    // Navigate to dashboard
    navigate("/");
  };

  const toggleGrowthArea = (areaId: string) => {
    setData((prev) => ({
      ...prev,
      growthAreas: prev.growthAreas.includes(areaId)
        ? prev.growthAreas.filter((id) => id !== areaId)
        : [...prev.growthAreas, areaId],
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.name.trim().length > 0;
      case 2:
        return data.bigBloom.trim().length > 0;
      case 3:
        return data.motivation.trim().length > 0;
      case 4:
        return data.growthAreas.length > 0;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🌱</div>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Welcome to REM — your personal growth space where dreams take root
              and flourish.
            </p>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="name" className="text-base font-medium">
              Your name
            </Label>
            <Input
              id="name"
              placeholder="What do your friends call you?"
              value={data.name}
              onChange={(e) =>
                setData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="text-lg py-3 rounded-2xl border-2 focus:border-purple-300 transition-colors"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="bloom" className="text-base font-medium">
              Your big bloom
            </Label>
            <Textarea
              id="bloom"
              placeholder="Maybe it's launching a creative project, building a habit, or exploring something new..."
              value={data.bigBloom}
              onChange={(e) =>
                setData((prev) => ({ ...prev, bigBloom: e.target.value }))
              }
              className="min-h-[120px] text-lg p-4 rounded-2xl border-2 focus:border-purple-300 transition-colors resize-none"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <Label htmlFor="motivation" className="text-base font-medium">
              What's inspiring you?
            </Label>
            <Textarea
              id="motivation"
              placeholder="Share what's driving this dream — your why, your spark, your story..."
              value={data.motivation}
              onChange={(e) =>
                setData((prev) => ({ ...prev, motivation: e.target.value }))
              }
              className="min-h-[120px] text-lg p-4 rounded-2xl border-2 focus:border-purple-300 transition-colors resize-none"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Label className="text-base font-medium">
              Choose your growth gardens
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {growthOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleGrowthArea(option.id)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                    data.growthAreas.includes(option.id)
                      ? "border-purple-300 bg-purple-50 shadow-md transform scale-105"
                      : "border-gray-200 hover:border-purple-200 hover:bg-purple-25"
                  }`}
                >
                  <div className="text-2xl mb-2">{option.emoji}</div>
                  <div className="font-medium text-sm">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🌺</div>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Amazing! Your growth journey is about to begin. Let's turn those
              dreams into reality.
            </p>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-2xl">
              <p className="text-sm font-medium text-purple-800">
                "{data.bigBloom}" is ready to bloom! 🌱→🌸
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentStep ? "bg-purple-400" : "bg-purple-200"
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Main card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {steps[currentStep].title}
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  {steps[currentStep].subtitle}
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                {renderStepContent()}

                <div className="flex justify-between mt-8">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="rounded-2xl px-6"
                    >
                      Back
                    </Button>
                  )}

                  <div className="ml-auto">
                    {currentStep === steps.length - 1 ? (
                      <Button
                        onClick={handleComplete}
                        className="rounded-2xl px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        Start Growing! 🌱
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="rounded-2xl px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                      >
                        {currentStep === 0 ? "Let's Begin" : "Continue"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
