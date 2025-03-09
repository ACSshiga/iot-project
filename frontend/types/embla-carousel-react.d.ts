declare module 'embla-carousel-react' {
  import { EmblaCarouselType } from 'embla-carousel';

  export type UseEmblaCarouselType = [
    (node: HTMLElement | null) => void,
    EmblaCarouselType
  ];

  export default function useEmblaCarousel(
    options?: Record<string, unknown>,
    plugins?: unknown[]
  ): UseEmblaCarouselType;
} 