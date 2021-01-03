import {ChangeEvent, Component, createRef} from "react";

interface Props {};
interface State {
  file: any,
  imageWidth: Number,
  imageHeight: Number
};

class App extends Component<Props, State> {
  public image: any;
  public file: any;
  public canvas: any;

  constructor(props: Props) {
    super(props);
    this.canvas = createRef();
    this.image = createRef();
    this.saveImage = this.saveImage.bind(this);
    this.preview = this.preview.bind(this);
    this.setImage = this.setImage.bind(this);
  }

  state: State = {
    file: null,
    imageWidth: 150,
    imageHeight: 150
  }

  preview(e: ChangeEvent<HTMLInputElement>): void {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.setState({
      file: URL.createObjectURL(file)
    });
  }

  setImage(): void {
    let ctx = this.canvas.current.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
    ctx.drawImage(
      this.image.current,
      0, 0,
      this.state.imageWidth,
      this.state.imageHeight
    );
  }

  updateWidth(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      imageWidth: parseInt(e.target.value)
    })
  }

  updateHeight(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      imageHeight: parseInt(e.target.value)
    })
  }

  saveImage(): void {
    let image = this.canvas.current.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image;
  }

  render() {
    return (
      <div className="bg-green-100 h-screen">
        <div className="flex justify-between items-center shadow-xl p-5 bg-green-600">
          <p className="text-3xl font-semibold text-white animate-pulse">Image App</p>
          <p className="text-sm text-white">Anthony Haddad</p>
        </div>
        <canvas ref={this.canvas} 
                className="block w-1/2 mx-auto border-4 border-solid border-green-600 rounded-md mt-4"></canvas>
        <div className="flex justify-around max-w-4xl mx-auto items-center mt-10">
          <p><input type="file" className="button" onChange={this.preview} /></p>
          <img ref={this.image} 
               src={this.state.file} 
               className="hidden" 
               alt="pic"/>
          <button className="button" 
                  onClick={this.setImage}>Set Image</button>
          <button className="button" 
                  onClick={this.saveImage}>Save Image</button>
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          <input type="text" className="input-field mb-2" onChange={(e) => this.updateWidth(e)} placeholder="Image Width" />
          <input type="text" className="input-field" onChange={(e) => this.updateHeight(e)} placeholder="Image Height" />
        </div>
      </div>
    );
  }
}

export default App;
