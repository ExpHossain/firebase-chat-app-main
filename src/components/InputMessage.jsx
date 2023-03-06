export const MessageInput = ({formValue, setFormValue, sendMessage, imageValue, setImageValue}) => {
    return <div
      style={{
        backgroundColor: "#f8f8f8",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          width: "100%",
        }}
      >
        <input
          placeholder="Enter a message..."
          style={{ flexGrow: 2, padding: "10px" }}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          type={"text"} />
        <button style={{ flexGrow: 1 }} onClick={(e) => sendMessage()}>
          Send
        </button>
        <input
          style={{ width: "1rem", flexGrow: 1, padding: "10px" }}
          type="file"
          id="image"
          name="image"
          accept="image/*"
          value={imageValue}
          onChange={(e) => setImageValue(e.target.value)}
        ></input>
      </div>
    </div>;
  }