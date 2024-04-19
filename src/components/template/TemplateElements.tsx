import { TitleFieldTemplateElement } from "@/components/template/fields/TitleField";
import { RadioFieldTemplateElement } from "@/components/template/fields/RadioField";

export type ElementsType =
  | "TitleField"
  | "RadioField";

export type SubmitFunction = (key: string, value: string) => void;

export type TemplateElement = {
  type: ElementsType;

  construct: (id: string, params?: Record<string, any>) => TemplateElementInstance;

  designerButtonElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: TemplateElementInstance;
  }>;
  templateComponent: React.FC<{
    elementInstance: TemplateElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: TemplateElementInstance;
  }>;

  validate: (
    templateElementInstance: TemplateElementInstance,
    currentValue: string,
    customParams?: any
  ) => boolean;
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
  RadioField: RadioFieldTemplateElement
};