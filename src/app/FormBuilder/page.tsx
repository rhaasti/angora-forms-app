/* eslint-disable react/react-in-jsx-scope */
'use client';
import { useState } from 'react';
import Customizers from '../(components)/Customizers';
import TSBuilder from '../(components)/TSBuilder';
import HTMLBuilder from '../(components)/HTMLBuilder';
import controllers from '../../../lib/controllers';
import { ConfigType, SavedCode } from '../../../lib/types';

export default function FormBuilder() {
  //detects when reset button is pressed by incrementing the numericla value
  //allow child component to detch when the button is pressed by looking at the value/count
  const [pressResetButton, setPressResetButton] = useState<number>(0);

  //stores group name
  const [formGroupName, setFormGroupName] = useState<string>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const handleBlur = (): void => {
    setIsTouched(true);
  };
  
  //this is where state is first defined for the form configuration
  //the formControl Arrray is going to contain all the html components and initialize to an empty array
  const [currentConfig, setCurrentConfig] = useState<ConfigType>({
    formGroupName: '',
    formControl: [],
    initialValues: [],
    inputType: [],
    labelText: [],
    errorMessage: [],
    validators: [],
  });
  const [fileTab, setFileTab] = useState<string>('html');

  //these states are used to register the changes within the TS and HTML editors/IDE
  const [htmlCode, setHTMLCode] = useState<string>('');
  const [tsCode, setTsCode] = useState<string>('');

  //save code, make post request
  const saveEditor = async () => {
    const currentUserId = await controllers.getUserId();
    const savedCode: SavedCode = {
      htmlCode: htmlCode,
      tsCode: tsCode,
      userid: currentUserId,
      type: 'saveCode',
    };
    const response = await fetch('/api/savedComponents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(savedCode),
    });
    //will use data for error handling in future
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = await response.json();
  };

  return (
    <article>
      <div className="mt-[100px] flex justify-evenly items-end">
        <div className="flex flex-col w-1/2 text-center">
          <label htmlFor="formGroup">Form Group Name</label>
          <input
            className="border border-black rounded-md p-2"
            onChange={(e) => setFormGroupName(e.target.value)}
            name="formGroup"
            type="text"
            onBlur={handleBlur}
          />
          {formGroupName.length < 1 && isTouched === true && (
            <p className="text-red-400"> Form Group is a required field</p>
          )}
        </div>
        <button
          className="p-2 border border-black rounded-md hover:bg-red-400 duration-500"
          onClick={() => {
            //increment pressResetbutton so child can detech button press
            setPressResetButton(pressResetButton + 1);
            //turn it back to the default configuration after pressing reset
            setCurrentConfig({
              formGroupName: '',
              formControl: [],
              initialValues: [],
              inputType: [],
              labelText: [],
              errorMessage: [],
              validators: [],
            });
          }}
        >
          RESET
        </button>
      </div>
      <div className="mt-6 mx-5 flex flex-row justify-evenly items-start max-sm:flex-col">
        <div
          className="w-1/2 max-sm:w-full"
          style={{ display: fileTab === 'ang' ? 'none' : 'flex' }}
        >
          <Customizers
            formGroupName={formGroupName}
            currentConfig={currentConfig}
            setCurrentConfig={setCurrentConfig}
          />
        </div>
        <div className="flex flex-col justify-center w-1/2 h-1/2 max-sm:w-full max-sm:mt-5">
          <header>
            <button
              className="inline border border-black w-1/2 rounded-tl-md py-1 hover:bg-red-400 hover:text-white duration-500"
              onClick={() => setFileTab('html')}
            >
              HTML File
            </button>
            <button
              className="inline border border-black w-1/2 py-1 whitespace-nowrap hover:bg-blue-400 hover:text-white duration-500"
              onClick={() => setFileTab('ts')}
            >
              TypeScript File
            </button>
          </header>
          <div
            style={{ display: fileTab === 'html' ? 'inline-block' : 'none' }}
          >
            <HTMLBuilder
              setHTMLCode={setHTMLCode}
              pressResetButton={pressResetButton}
              currentConfig={currentConfig}
            />
          </div>
          <div style={{ display: fileTab === 'ts' ? 'inline-block' : 'none' }}>
            <TSBuilder
              setTsCode={setTsCode}
              pressResetButton={pressResetButton}
              currentConfig={currentConfig}
            />
          </div>
          <button
            className="m-auto mt-2 border-2 border-black text-red-400 rounded-md w-1/4 p-2 duration-500 hover:text-white hover:bg-red-400"
            onClick={saveEditor}
          >
            Save template
          </button>
        </div>
      </div>
    </article>
  );
}
