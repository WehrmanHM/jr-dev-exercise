"use client";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Trash2 } from "lucide-react";
import StarRating from "./star-rating";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { RatedJoke } from "@/lib/utils";
import { clearRatedJokes } from "@/lib/jokesSlice";

export default function Leaderboard() {
  const dispatch = useDispatch<AppDispatch>();

  const handleClearAll = () => {
    //TODO: Dispatch clearRatedJokes
    dispatch(clearRatedJokes());
  };

  // TODO: Get ratedJokes from Redux state using useSelector
  const jokes: RatedJoke[] = useSelector((state: RootState) => state.jokes.ratedJokes);
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return (
          <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">
            #{index + 1}
          </span>
        );
    }
  };

  const getRankBadgeColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 1:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 2:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (jokes.length === 0) {
    return (
      <Card className="text-center">
        <CardContent className="pt-6">
          <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No Rated Jokes Yet
          </h3>
          <p className="text-gray-500">
            Start rating some jokes to see them appear on the leaderboard!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Joke Leaderboard
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="text-red-600 hover:text-red-700 bg-transparent"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Top rated jokes sorted by your ratings
          </p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {jokes.map((joke, index) => (
          <Card
            key={joke.id}
            className={cn(
              "transition-all duration-200 hover:shadow-md",
              index < 3 ? "ring-2" : "",
              index === 0
                ? "ring-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50"
                : "",
              index === 1
                ? "ring-gray-200 bg-gradient-to-r from-gray-50 to-slate-50"
                : "",
              index === 2
                ? "ring-amber-200 bg-gradient-to-r from-amber-50 to-orange-50"
                : ""
            )}
          >
            <CardContent className="pt-4">
              <div className="flex items-start gap-4">
                {/* Rank */}
                <div className="flex flex-col items-center gap-2">
                  {getRankIcon(index)}
                  <Badge
                    className={cn(
                      "text-xs px-2 py-1",
                      getRankBadgeColor(index)
                    )}
                  >
                    Rank {index + 1}
                  </Badge>
                </div>

                {/* Joke Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {joke.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        ID: {joke.id}
                      </Badge>
                    </div>
                    <StarRating rating={joke.rating} readonly size="sm" />
                  </div>

                  <div className="bg-white/50 rounded-lg p-3">
                    {joke.type === "twopart" ? (
                      <div className="space-y-2">
                        <p className="text-gray-800 font-medium text-sm">
                          {joke.setup}
                        </p>
                        <div className="border-l-3 border-blue-400 pl-3">
                          <p className="text-gray-700 italic text-sm">
                            {joke.delivery}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-800 text-sm">{joke.joke}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
