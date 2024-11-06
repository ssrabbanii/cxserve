"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
  import { Badge } from "@/components/ui/badge";
  import { useState } from "react";
  import { ImageOff, PlusCircle } from "lucide-react";
  
  export const Flights: React.FC = () => {
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
  
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const fileURLs = Array.from(event.target.files).map(file =>
          URL.createObjectURL(file)
        );
        setPreviewImages(fileURLs);
      }
    };
  
    return (
      <div className="mx-auto w-full max-w-2xl p-4">
        <h1 className="text-2xl font-bold mb-4">Add New Flight</h1>
  
        {/* Meals Section */}
        <h2 className="text-xl font-semibold mt-6 mb-3">Pre-Flight Meals</h2>
        <div className="flex gap-4">
          {["Standard", "Vegetarian", "Gluten-Free"].map((mealType, index) => (
            <Card key={index} className="w-full max-w-xs">
              <CardHeader>
                <CardTitle>{mealType}</CardTitle>
                <CardDescription>Meal Labels Here</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="aspect-square w-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <ImageOff className="text-gray-500 w-16 h-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
  
        {/* Post-Flight Meal Upload Section */}
        <h2 className="text-xl font-semibold mt-6 mb-3">Post-Flight Meal</h2>
        <div className="border border-dashed border-gray-300 rounded-lg p-4">
          <Label htmlFor="upload" className="text-center cursor-pointer block">
            Drag and drop or choose files
          </Label>
          <Input
            type="file"
            id="upload"
            accept="image/*"
            className="hidden"
            multiple
            onChange={handleImageUpload}
          />
        </div>
  
        {/* Preview Images */}
        <h3 className="text-lg font-semibold mt-4 mb-3">Preview Images</h3>
        <div className="flex gap-4">
          {previewImages.length ? (
            previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md"
              />
            ))
          ) : (
            <p className="text-gray-500">No images uploaded</p>
          )}
        </div>
  
        {/* Generate Report Button */}
        <Button
          className="mt-6"
          onClick={() => alert("Report Generated")}
        >
          Generate Report
        </Button>
  
        {/* Analysis Section */}
        <h2 className="text-xl font-semibold mt-6 mb-3">Analysis</h2>
        <div className="flex items-end gap-4">
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 w-12 h-32 rounded-t-md"></div>
            <p className="mt-2">Savvy Meal Plan</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 w-12 h-48 rounded-t-md"></div>
            <p className="mt-2">Snack Attack</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 w-12 h-40 rounded-t-md"></div>
            <p className="mt-2">A La Carte</p>
          </div>
        </div>
  
        {/* Add Flight Button */}
        <Button
          className="mt-6"
          onClick={() => alert("Flight Added")}
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Flight
        </Button>
      </div>
    );
  };