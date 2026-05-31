"use client";

// TODO: Import necessary hooks and functions from Redux
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchJoke, loadRatedJokes, clearRatedJokes } from "@/lib/jokesSlice";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw } from "lucide-react";
import JokeCard from "./joke-card";
import Leaderboard from "./leaderboard";

const categories = [
  "Any",
  "Programming",
  "Miscellaneous",
  "Pun",
  "Spooky",
  "Christmas",
];

export default function JokesApp() {
  const [selectedCategory, setSelectedCategory] = useState("Any");
  const [currentView, setCurrentView] = useState<"jokes" | "leaderboard">(
    "jokes"
  );

  // TODO: Get the dispatch function using useDispatch<AppDispatch>()
  const dispatch = useDispatch<AppDispatch>();

  // TODO: Get jokes state from Redux using useSelector
  const { currentJoke, loading, error, ratedJokes } = useSelector((state: RootState) => state.jokes);

  // TODO: On mount, dispatch loadRatedJokes
  useEffect(() => {
    dispatch(loadRatedJokes());
  }, [dispatch]);

  // // TODO: Implement handleRateJoke to dispatch rateJoke
  // const handleRateJoke = (rating: number) => {
  //   if (currentJoke) {
  //     dispatch(rateJoke({joke: currentJoke, rating}));
  //   }
  // };

  // TODO: Implement handleFetchJoke to dispatch fetchJoke
  const handleFetchJoke = () => {
    dispatch(fetchJoke(selectedCategory));
   }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Controls */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg p-1 shadow-sm border">
          <Button
            variant={currentView === "jokes" ? "default" : "ghost"}
            onClick={() => setCurrentView("jokes")}
            className="mr-1"
          >
            Get Jokes
          </Button>
          <Button
            variant={currentView === "leaderboard" ? "default" : "ghost"}
            onClick={() => setCurrentView("leaderboard")}
          >
            {/* TODO: Show the number of rated jokes from Redux state */}
            Leaderboard ({ratedJokes.length})
          </Button>
        </div>
      </div>
      {currentView === "jokes" ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Get a Random Joke</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium mb-2"
                  >
                    Category
                  </label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    // TODO: Call handleFetchJoke on click and disable when loading
                    onClick={handleFetchJoke}
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                  {/* TODO: Show loading spinner and text when loading -  <Loader2 className="mr-2 h-4 w-4 animate-spin" />*/}
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                      Loading...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Get Joke
                    </>
                  )
                  }
                </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TODO: Show error message if error exists in Redux state */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {/* TODO: Show JokeCard if currentJoke exists and not loading or error */}
          {currentJoke && !loading && !error && <JokeCard />}
          {/* TODO: Show initial state if no currentJoke, not loading, and no error */}
          {!currentJoke && !loading && !error && <p className="text-center">Click "Get Joke" for free jokes</p>}
        </>
      ) : (
        <Leaderboard />
      )}
    </div>
  );
}
