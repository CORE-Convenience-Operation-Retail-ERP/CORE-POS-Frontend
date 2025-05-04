import { useState } from "react";

const ManualInputCom = ({onBarcodeSubmit}) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if(!input.trim()) {
      alert("바코드를 입력해주세요.");
      return;
    }
    onBarcodeSubmit(input.trim());
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();  
  };

    return(
      <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="바코드를 직접 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ padding: '10px', fontSize: '16px', width: '250px' }}
      />
      <button onClick={handleSubmit} style={{ marginLeft: '10px', padding: '10px' }}>
        추가
      </button>
    </div>
  )
  };
  export default ManualInputCom;