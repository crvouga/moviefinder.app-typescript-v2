type Props = {
  class?: string;
};

export const IconSpinner = () => {
  return `<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        stroke="currentColor"
        viewBox="0 0 24 24"
        class="size-12"
      >
        <path
          fill-rule="evenodd"
          d="M12 19a7 7 0 100-14 7 7 0 000 14zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
          clip-rule="evenodd"
          opacity="0.2"
        />
        <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 00-7 7H2z" />
      </svg>`;
};

export const IconArrowLeft = () => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
        <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
    </svg>`;
};

export const IconDoorOpen = (props?: Props) => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" class="$CLASS">
        <path d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5L64 448l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 192 0 32 0 0-32 0-448zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128l96 0 0 352c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-320c0-35.3-28.7-64-64-64l-96 0 0 64z"/>
    </svg>`.replace("$CLASS", props?.class ?? "size-7");
};
