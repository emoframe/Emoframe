import { TitleFieldTemplateElement } from "@/components/template/fields/TitleField";
import { OptionsFieldTemplateElement } from "@/components/template/fields/OptionsField";
import { SeparatorFieldTemplateElement } from "@/components/template/fields/SeparatorField";
import { SubTitleFieldTemplateElement } from "@/components/template/fields/SubTitleField";
import { ParagprahFieldTemplateElement } from "./fields/ParagraphField";

export type ElementsType =
  | "TitleField"
  | "SubTitleField"
  | "SeparatorField"
  | "ParagraphField"
  | "OptionsField"
;

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
    currentValue: string
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
  SubTitleField: SubTitleFieldTemplateElement,
  SeparatorField: SeparatorFieldTemplateElement,
  ParagraphField: ParagprahFieldTemplateElement,
  OptionsField: OptionsFieldTemplateElement,
};