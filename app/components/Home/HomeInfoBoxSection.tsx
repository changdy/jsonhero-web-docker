import React, { useEffect, useRef, useState } from "react";
import { JsonProvider } from "~/hooks/useJson";
import { JsonColumnViewProvider, useJsonColumnViewAPI, } from "~/hooks/useJsonColumnView";
import { JsonDocProvider } from "~/hooks/useJsonDoc";
import { JsonPreview } from "../JsonPreview";
import { PreviewValue } from "../Preview/PreviewValue";
import { ExtraLargeTitle } from "../Primitives/ExtraLargeTitle";
import { SmallSubtitle } from "../Primitives/SmallSubtitle";
import { PropertiesValue } from "../Properties/PropertiesValue";
import { HomeSection } from "./HomeSection";

const json = {
  id: "a1c33bd1-0528-4de3-a745-44d95e7ac3d8",
  title: "JSON Hero is a tool for JSON",
  thumbnail: "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy-downsized.gif",
  createdAt: "2022-02-01T02:25:41-05:00",
  tint: "#EAB308",
  webpages: "https://www.theonion.com/",
  youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  json: "bourne",
};

const infoBoxData = [
  {
    title: "Images",
    highlight: "$.thumbnail",
  },
  {
    title: "Dates",
    highlight: "$.createdAt",
  },
  {
    title: "Colors",
    highlight: "$.tint",
  },
  {
    title: "URLs",
    highlight: "$.webpages",
  },
  {
    title: "Videos",
    highlight: "$.youtube",
  },
];

const autoplayDuration = 3000;

export function HomeInfoBoxSection() {
  return (
    <SampleJSONPreview initialSelection={infoBoxData[0].highlight}>
      <HomeInfoBoxSectionContent/>
    </SampleJSONPreview>
  );
}

function HomeInfoBoxSectionContent() {
  const [index, setIndex] = useState(0);
  const api = useJsonColumnViewAPI();
  const interval = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    const selectedPath = infoBoxData[index].highlight;
    api.goToNodeId(selectedPath, "home");
  }, [index]);

  const resetInterval = () => {
    if (interval.current != null) {
      clearInterval(interval.current);
    }
    interval.current = setInterval(() => {
      setIndex((i) => (i = (i + 1) % infoBoxData.length));
    }, autoplayDuration);
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (interval.current == null) return;
      clearInterval(interval.current);
    };
  }, []);

  return (
    <HomeSection containerClassName="bg-black p-6">

    </HomeSection>
  );
}

function SampleJSONPreview({
  children,
  initialSelection,
}: {
  children: React.ReactNode;
  initialSelection: string;
}) {
  return (
    <JsonDocProvider
      doc={{
        id: "sample",
        title: "Sample",
        type: "raw",
        readOnly: false,
        contents: "",
      }}
      path={initialSelection}
    >
      <JsonProvider initialJson={json}>
        <JsonColumnViewProvider>{children}</JsonColumnViewProvider>
      </JsonProvider>
    </JsonDocProvider>
  );
}
