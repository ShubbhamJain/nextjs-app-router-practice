import { NextResponse } from "next/server";

const aboutPageData = [
  {
    createdAt: "2023-12-12T15:57:22Z",
    text: `kwkmww ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum urna nec eros scelerisque viverra. 
          Pellentesque molestie malesuada ipsum, quis venenatis lectus varius ut. Nulla sem augue, rutrum non nisl cursus, 
          lobortis euismod ipsum. Praesent ac ligula at nibh venenatis ultrices. Proin placerat ipsum nec rutrum posuere. 
          Phasellus vehicula ipsum odio, sed tempus nisl malesuada eu. Fusce fermentum leo lacus, at pulvinar ex commodo vitae. 
          Nulla condimentum ligula sed viverra blandit. Sed varius erat id interdum porta. Donec ultrices urna id pretium suscipit. 
          Sed ultricies mi pulvinar libero commodo, eget lacinia lacus scelerisque.\n\n`,
    id: 1,
  },
  {
    createdAt: "2024-01-12T15:57:22Z",
    text: `Suspendisse blandit velit nisl, et lobortis lectus vestibulum quis. Vestibulum at tempus felis. 
          Etiam porttitor semper nulla, et lobortis nisl maximus placerat. Nunc augue tortor, mattis id augue vel, 
          blandit ornare nunc. Etiam sollicitudin posuere justo ut gravida. Suspendisse ullamcorper hendrerit sapien cursus 
          fermentum. Ut posuere scelerisque tellus, sed ullamcorper purus lacinia vitae. Mauris tempus mi quis nulla laoreet 
          vulputate. Nunc sit amet egestas risus, quis vehicula lacus. Suspendisse pellentesque placerat eleifend.\n\n`,
    id: 2,
  },
  {
    createdAt: "2024-02-12T15:57:22Z",
    text: `Aenean vitae sapien quis justo aliquet scelerisque. Sed a enim ac massa accumsan blandit ac ac urna. 
          Suspendisse eu lectus tempus, porta eros non, rutrum libero. Maecenas mollis urna eget placerat tempor. 
          Curabitur id dictum ex, a interdum elit. Integer aliquam ipsum a venenatis vestibulum. Donec nisl elit, 
          sollicitudin id mi non, sollicitudin luctus ante.\n\n`,
    id: 3,
  },
];

export async function GET(req: Request) {
  return NextResponse.json(aboutPageData, {
    status: 200,
  });
}
