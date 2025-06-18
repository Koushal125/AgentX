export interface WorkflowPlan {
  steps: {
    stepNumber: number;
    name: string;
    action: string;
    config?: Record<string, any>;
  }[];
}
