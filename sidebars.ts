import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import * as fs from "fs";

const docsDir = "./docs";
const componentsDir = `${docsDir}/components`;
const hooksDir = `${docsDir}/hooks`;
const utilsDir = `${docsDir}/utils`;

// 폴더에 있는 모든 파일을 가져옴
const componentsFiles = fs.readdirSync(componentsDir);
const hooksFiles = fs.readdirSync(hooksDir);
const utilsFiles = fs.readdirSync(utilsDir);
const cssFiles = fs.readdirSync(`${docsDir}/css`);
const honghaePlusFiles = fs.readdirSync(`${docsDir}/honghae-plus`);
const booksFiles = fs.readdirSync(`${docsDir}/books`);
const svgFiles = fs.readdirSync(`${docsDir}/svg`);
const articlesFiles = fs.readdirSync(`${docsDir}/articles`);

const cutPrefixNumber = (fileName: string) => fileName.split("_")[1];
const cutSuffixMd = (fileName: string) => fileName.split(".")[0];
const convertToDocTitle = (fileName: string) =>
  cutSuffixMd(cutPrefixNumber(fileName));

const sidebars: SidebarsConfig = {
  computerScienceSidebar: [
    {
      type: "doc",
      id: "computer-science/intro",
    },
    {
      type: "category",
      label: "운영체제",
      items: [
        "computer-science/operations-system/intro",
        "computer-science/operations-system/day1",
        "computer-science/operations-system/day2",
        "computer-science/operations-system/day3",
        "computer-science/operations-system/day4",
        "computer-science/operations-system/day5",
      ],
    },
    {
      type: "category",
      label: "데이터베이스",
      items: [
        "computer-science/database/intro",
        "computer-science/database/day1",
        "computer-science/database/day2",
        "computer-science/database/day3",
        "computer-science/database/day4",
        "computer-science/database/day5",
        "computer-science/database/day6",
        "computer-science/database/day7",
      ],
    },
    {
      type: "category",
      label: "네트워크",
      items: [
        "computer-science/network/intro",
        "computer-science/network/day1",
        "computer-science/network/day2",
        "computer-science/network/day3",
        "computer-science/network/day4",
        "computer-science/network/day5",
        "computer-science/network/day6",
        "computer-science/network/day7",
      ],
    },
    {
      type: "category",
      label: "알고리즘",
      items: [
        "computer-science/algorithm/intro",
        "computer-science/algorithm/day1",
        "computer-science/algorithm/day2",
        "computer-science/algorithm/day3",
        "computer-science/algorithm/day4",
        "computer-science/algorithm/day5",
        "computer-science/algorithm/day6",
        "computer-science/algorithm/day7",
      ],
    },
  ],
  tutorialSidebar: [
    "intro",
    {
      type: "category",
      label: "svg tutorial",
      items: [...svgFiles.map((file) => `svg/${convertToDocTitle(file)}`)],
    },
    {
      type: "category",
      label: "css tutorial",
      items: [...cssFiles.map((file) => `css/${convertToDocTitle(file)}`)],
    },
    {
      type: "category",
      label: "honghae plus",
      items: [
        ...honghaePlusFiles.map(
          (file) => `honghae-plus/${convertToDocTitle(file)}`
        ),
      ],
    },
  ],
  toolboxSidebar: [
    {
      type: "autogenerated",
      dirName: "toolbox",
    },
    {
      type: "category",
      label: "Components",
      items: [
        ...componentsFiles.map(
          (file) => `components/${convertToDocTitle(file)}`
        ),
      ],
    },
    {
      type: "category",
      label: "Hooks",
      items: [...hooksFiles.map((file) => `hooks/${convertToDocTitle(file)}`)],
    },
    {
      type: "category",
      label: "Utils",
      items: [...utilsFiles.map((file) => `utils/${convertToDocTitle(file)}`)],
    },
  ],
  booksSidebar: [
    {
      type: "autogenerated",
      dirName: "books",
    },
  ],
  articleSidebar: [
    {
      type: "autogenerated",
      dirName: "articles",
    },
  ],
};

export default sidebars;
