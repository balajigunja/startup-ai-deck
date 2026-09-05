import React from "react";
import { SlideData, PitchInput } from "../../types/index.ts";
import { MarketSizeDiagram } from "./MarketSizeDiagram.tsx";
import { MatrixDiagram } from "./MatrixDiagram.tsx";
import { FunnelDiagram } from "./FunnelDiagram.tsx";
import { ArchitectureDiagram } from "./ArchitectureDiagram.tsx";
import { ValueChainDiagram } from "./ValueChainDiagram.tsx";
import { GrowthChartDiagram } from "./GrowthChartDiagram.tsx";
import { TeamOrgDiagram } from "./TeamOrgDiagram.tsx";
import { DonutAllocationDiagram } from "./DonutAllocationDiagram.tsx";

interface SlideDiagramProps {
  slide: SlideData;
  pitchInput: PitchInput;
}

export const SlideDiagram: React.FC<SlideDiagramProps> = ({ slide, pitchInput }) => {
  switch (slide.slideType) {
    case "problem":
      return (
        <MatrixDiagram
          title="Problem Severity vs Frequency"
          ourStartupName={pitchInput.startupName}
          xAxisLabel="Frequency of Occurrence →"
          yAxisLabel="Financial / Operational Pain Severity →"
        />
      );
    case "solution":
      return <FunnelDiagram />;
    case "marketSize":
      return <MarketSizeDiagram slide={slide} />;
    case "product":
      return <ArchitectureDiagram status={slide.status} />;
    case "businessModel":
      return <ValueChainDiagram slide={slide} />;
    case "competition":
      return (
        <MatrixDiagram
          title="Competitive Positioning Grid"
          ourStartupName={pitchInput.startupName}
          competitors={slide.competitors}
          xAxisLabel="Deployment Friction →"
          yAxisLabel="AI Automation Power →"
        />
      );
    case "traction":
      return <GrowthChartDiagram slide={slide} />;
    case "team":
      return <TeamOrgDiagram slide={slide} />;
    case "ask":
      return <DonutAllocationDiagram slide={slide} />;
    default:
      return null;
  }
};
