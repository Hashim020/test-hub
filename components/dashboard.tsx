"use client";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { getQuestions } from "@/app/api/data/data";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { CountdownTimer } from "nextjs-countdown-timer";
import { Button } from "./ui/button";
import Link from "next/link";

let MAX_QUESTIONS = 30;
interface Question {
  id: string;
  question: string;
  options: Array<{ id: string; option: string }>;
}

const Dashboard = () => {
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  useEffect(() => {
    loadQuestion(currentStep);
  }, [currentStep]);

  useEffect(() => {
    setAnsweredCount((prevCount) => prevCount + 1);
  }, [responses]);

  const loadQuestion = async (step: number) => {
    setIsLoading(true);
    try {
      const questionList = await getQuestions();
      setActiveQuestion(questionList[step - 1]);
    } catch (error) {
      console.error("Failed to load question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onTimerFinish = () => {
    alert("time is up");
  };

  const changeStep = (step: number) => {
    setCurrentStep(step);
  };

  const updateResponse = (questionId: string, answer: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: answer,
    }));
  };

  const goToNext = () => {
    if (currentStep < MAX_QUESTIONS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col  md:flex-row justify-center gap-4 h-[600px] ">
      <div className="bg-white w-full md:w-3/12 overflow-hidden rounded-lg shadow p-2">
        <div className=" mb-4 ">
          <h1 className="text-lg font-semibold p-4 border-b">Overview</h1>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <div className="flex flex-wrap items-center gap-1">
                {Array.from({ length: MAX_QUESTIONS }, (_, index) => {
                  const questionKey = `q${index + 1}`;
                  const isAnswered = !!responses[questionKey];

                  return (
                    <PaginationLink
                      key={index}
                      href="#"
                      onClick={() => changeStep(index + 1)}
                      className={
                        currentStep === index + 1 && isAnswered
                          ? "bg-green-500 rounded-3xl"
                          : currentStep === index + 1
                          ? "border border-orange-400 rounded-3xl text-gray-950"
                          : isAnswered
                          ? "bg-green-500 rounded-3xl text-white"
                          : "text-gray-500 rounded-3xl bg-secondary"
                      }
                    >
                      {index + 1}
                    </PaginationLink>
                  );
                })}
              </div>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="bg-white w-full md:w-7/12 flex flex-col rounded-lg shadow">
        <div className="flex-grow flex flex-col">
          <div className="mt-6 flex w-full justify-between">
            <div className="ml-7 font-medium">
              <p className=" text-sm mt-3">
                MCQ - <span className="text-red-500">{activeQuestion?.id}</span>
              </p>
            </div>
            <div className="me-10 bg-slate-100 h-[23px] rounded-md">
              <CountdownTimer
                initialSeconds={3600}
                onTimerEnd={onTimerFinish}
              />
            </div>
          </div>
          {isLoading ? (
            <div className="flex items-center mx-auto justify-center  h-full max-w-[600px]">
              <p>Loading question...</p>
            </div>
          ) : activeQuestion ? (
            <>
              <Card className="w-full mx-auto max-w-[600px]">
                <CardContent className="p-6">
                  <div className=" border-b mb-4">
                    <p className="mb-4 font-semibold text-lg">
                      {activeQuestion.question}
                    </p>
                  </div>

                  <RadioGroup
                    onValueChange={(value) =>
                      updateResponse(activeQuestion.id, value)
                    }
                    value={responses[activeQuestion.id] || ""}
                  >
                    {activeQuestion.options.map((option, index) => (
                      <div
                        key={option.id}
                        className="flex items-center text-gray-500 space-x-3 mb-5"
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={`option-${option.id}`}
                          aria-label={String.fromCharCode(65 + index)}
                        />

                        <Label htmlFor={`option-${option.id}`}>
                          {option.option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No question available.</p>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-4 p-4 border ">
          <div className="">
            <Link href={"/result"}>
              <Button disabled={answeredCount < MAX_QUESTIONS / 2}>
                End and Submit
              </Button>
            </Link>
          </div>

          <div className="flex justify-between gap-2 ">
            <Button
              onClick={goToPrevious}
              variant={"secondary"}
              disabled={currentStep === 1}
              className={`  flex gap-2`}
            >
              <ChevronLeft size={15} />
              <span className="hidden md:block sm:block lg:block">
                Previous
              </span>
            </Button>

            <Button
              variant={"secondary"}
              className="flex justify-between gap-2"
            >
              <span>Flag</span>
              <Flag size={15} />
            </Button>
            <Button
              variant={"secondary"}
              onClick={goToNext}
              disabled={currentStep === MAX_QUESTIONS}
              className="flex gap-2"
            >
              <span className="hidden md:block sm:block lg:block">Next</span>
              <ChevronRight size={15} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
