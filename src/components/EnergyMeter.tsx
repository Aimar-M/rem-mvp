import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EnergyMeterProps {
  variant?: "full" | "preview";
  energyLevel?: "high" | "medium" | "low";
  className?: string;
}

const EnergyMeter: React.FC<EnergyMeterProps> = ({ 
  variant = "full", 
  energyLevel = "medium",
  className 
}) => {
  const energyConfig = {
    high: {
      emoji: "🌞",
      color: "from-peach-400 to-sky-400",
      bgColor: "from-peach-50 to-sky-50",
      borderColor: "border-peach-200",
      textColor: "text-peach-700",
      pulse: "animate-pulse",
      value: 85,
      title: "High Energy",
      description: "You're flowing! Want to tackle a stretch goal today? 🚀",
      previewText: "Feeling energized! Ready to bloom 🌸"
    },
    medium: {
      emoji: "🌤️",
      color: "from-sage-400 to-lavender-400",
      bgColor: "from-sage-50 to-lavender-50",
      borderColor: "border-sage-200",
      textColor: "text-sage-700",
      pulse: "",
      value: 60,
      title: "Medium Energy",
      description: "Keep steady — a small win will water your growth 🌱",
      previewText: "Steady energy for steady growth 🌱"
    },
    low: {
      emoji: "🌙",
      color: "from-stone-400 to-slate-400",
      bgColor: "from-stone-50 to-slate-50",
      borderColor: "border-stone-200",
      textColor: "text-stone-600",
      pulse: "animate-pulse",
      value: 25,
      title: "Low Energy",
      description: "Rest fuels growth too. How about journaling gratitude or a walk? 🌸",
      previewText: "Time to nurture yourself 🌸"
    }
  };

  const config = energyConfig[energyLevel];
  const size = variant === "preview" ? 60 : 120;
  const strokeWidth = variant === "preview" ? 4 : 8;

  const CircularProgress = () => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (config.value / 100) * circumference;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e7e5e4"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#gradient-${energyLevel})`}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id={`gradient-${energyLevel}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={config.color.split('-')[1] === 'peach' ? '#f2934a' : config.color.split('-')[1] === 'sage' ? '#5a6b5a' : '#78716c'} />
              <stop offset="100%" stopColor={config.color.split('-')[3] === 'sky' ? '#0ea5e9' : config.color.split('-')[3] === 'lavender' ? '#8b5cf6' : '#64748b'} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("text-2xl", variant === "preview" && "text-lg")}>
            {config.emoji}
          </span>
        </div>
      </div>
    );
  };

  if (variant === "preview") {
    return (
      <Card className={cn("rem-card border-sage-200 hover:scale-105 transition-all duration-300", className)}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className={cn("relative", config.pulse)}>
              <CircularProgress />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Badge 
                  className={cn(
                    "text-xs rounded-full",
                    energyLevel === "high" && "bg-peach-100 text-peach-700 border-peach-200",
                    energyLevel === "medium" && "bg-sage-100 text-sage-700 border-sage-200",
                    energyLevel === "low" && "bg-stone-100 text-stone-600 border-stone-200"
                  )}
                >
                  {config.title}
                </Badge>
              </div>
              <p className="text-sm text-stone-600 font-plus-jakarta">
                {config.previewText}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("rem-card border-sage-200", className)}>
      <CardHeader>
        <CardTitle className="flex items-center text-sage-700">
          <span className="mr-2">⚡</span>
          Energy Meter
        </CardTitle>
        <CardDescription className="text-stone-600">
          Your current energy level for growth and productivity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Energy Ring */}
        <div className="flex flex-col items-center">
          <div className={cn("relative mb-4", config.pulse)}>
            <CircularProgress />
          </div>
          <div className="text-center">
            <h3 className={cn("text-lg font-semibold mb-1", config.textColor)}>
              Energy Level: {config.title}
            </h3>
            <p className="text-sm text-stone-500">
              {config.value}% of your energy available
            </p>
          </div>
        </div>

        {/* Recommendation Card */}
        <div className={cn(
          "p-4 rounded-2xl border",
          energyLevel === "high" && "bg-gradient-to-r from-peach-50 to-sky-50 border-peach-200",
          energyLevel === "medium" && "bg-gradient-to-r from-sage-50 to-lavender-50 border-sage-200",
          energyLevel === "low" && "bg-gradient-to-r from-stone-50 to-slate-50 border-stone-200"
        )}>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">{config.emoji}</span>
            <div>
              <h4 className={cn(
                "font-medium mb-1",
                energyLevel === "high" && "text-peach-800",
                energyLevel === "medium" && "text-sage-800",
                energyLevel === "low" && "text-stone-700"
              )}>
                Energy Insight
              </h4>
              <p className={cn(
                "text-sm",
                energyLevel === "high" && "text-peach-700",
                energyLevel === "medium" && "text-sage-700",
                energyLevel === "low" && "text-stone-600"
              )}>
                {config.description}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Tips */}
        {energyLevel === "low" && (
          <div className="bg-lavender-50 p-4 rounded-2xl border border-lavender-200">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💜</span>
              <div>
                <h4 className="font-medium text-lavender-800 mb-1">
                  Gentle Reminder
                </h4>
                <p className="text-sm text-lavender-700">
                  Low energy doesn't mean low value. Sometimes the most important growth happens in rest.
                </p>
              </div>
            </div>
          </div>
        )}

        {energyLevel === "high" && (
          <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💙</span>
              <div>
                <h4 className="font-medium text-sky-800 mb-1">
                  Pro Tip
                </h4>
                <p className="text-sm text-sky-700">
                  Channel this energy into something meaningful. What's calling to your heart today?
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnergyMeter;
