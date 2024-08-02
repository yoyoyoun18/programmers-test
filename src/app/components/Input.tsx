"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

function Input() {
  const [searchWord, setSearchWord] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const [selectedLanguages, setSelectedLanguages] = useState<any[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      setCount((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "ArrowDown") {
      setCount((prev) => (prev < searchResult.length - 1 ? prev + 1 : prev));
    }
  };

  const handleChange = (e: any) => {
    setSearchWord(e.target.value);
  };

  const handleSubmit = (e: any) => {
    alert(searchResult[count]);
  };

  const updateSelectedLanguages = (targetLanguage: any) => {
    let updatedLanguages;

    if (selectedLanguages.includes(targetLanguage)) {
      updatedLanguages = selectedLanguages.filter(
        (language) => language !== targetLanguage
      );
      updatedLanguages.push(targetLanguage);
    } else {
      updatedLanguages = [...selectedLanguages, targetLanguage];
    }
    setSelectedLanguages(updatedLanguages);
  };

  useEffect(() => {
    setCount(targetCount);
  }, [targetCount]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/languages?query=${searchWord}`)
      .then((response) => {
        setSearchResult(response.data.languages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchWord]);

  return (
    <div>
      <main className="App text-black">
        <div className="SelectedLanguage">
          <ul>
            {selectedLanguages?.map((a, i) => (
              <li key={i}>{<span>{a}</span>}</li>
            ))}
          </ul>
        </div>
        <form className="SearchInput" onSubmit={handleSubmit}>
          <input
            className="SearchInput__input"
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="프로그램 언어를 입력하세요."
            onChange={handleChange}
          />
        </form>
        {searchWord ? (
          <div className="Suggestion">
            <ul>
              {searchResult?.map((a, i) => (
                <li
                  key={i}
                  className={count === i ? "Suggestion__item--selected" : ""}
                  onClick={() => {
                    // alert(a);
                    setTargetCount(a);
                    updateSelectedLanguages(a);
                  }}
                >
                  {<span>{a.split("")}</span>}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div></div>
        )}
      </main>
    </div>
  );
}

export default Input;
