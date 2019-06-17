import { CoreService } from "./core.service";
import { ObjectMapService } from "./object-map.service";
import { SnackerService } from "./snacker.service";
import { ThemeService } from "./theme.service";

export const Services = [
  CoreService,
  ObjectMapService,
  SnackerService,
  ThemeService
];

export * from "./core.service";
export * from "./object-map.service";
export * from "./snacker.service";
export * from "./theme.service";
