export type ElementsType =
  | "TitleField";

export type SubmitFunction = (key: string, value: string) => void;

export type TemplateElement = {
  type: ElementsType;

  construct: (id: string) => TemplateElementInstance;

  designerButtonElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: TemplateElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: TemplateElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: TemplateElementInstance;
  }>;

  validate: (formElement: TemplateElementInstance, currentValue: string) => boolean;
};

export type TemplateElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type TemplateElementsType = {
  [key in ElementsType]: TemplateElement;
};
export const TemplateElements: TemplateElementsType = {
  TitleField: TitleFieldTemplateElement,
};