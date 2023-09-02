const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../../content/blog');

function replaceImageTagsWithComponent(content) {
  const imageRegex = /!\[([^\]]+)\]\(([^)]+)\)/g;
  let imageCount = 0;
  const imageVariables = [];

  const updatedContent = content.replace(imageRegex, (match, altText, imagePath) => {
    const imageNameWithExtension = path.basename(imagePath);
    const imageVariable = `image_${imageCount++}`;
    imageVariables.push({ variable: imageVariable, imagePath: imageNameWithExtension });
    return `<Image src={${imageVariable}} alt="${altText}" title="${altText}" />`;
  });

  return { content: updatedContent, imageVariables };
}

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    if (path.extname(file) === '.mdx') {
      const filePath = path.join(directoryPath, file);

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        const { content, imageVariables } = replaceImageTagsWithComponent(data);

        if (imageVariables.length > 0) {
          const lastIndexOfTripleDash = content.lastIndexOf('---');

          if (lastIndexOfTripleDash !== -1) {
            const beforeTripleDash = content.substring(0, lastIndexOfTripleDash + 3);
            const afterTripleDash = content.substring(lastIndexOfTripleDash + 3);

            // Generate import statements for image variables using the actual image file names
            let imageImports = '';
            imageVariables.forEach(({ variable, imagePath }) => {
              const imageNameWithExtension = imagePath.split(' ')[0]; // Get only the image file name with extension
              imageImports += `import ${variable} from '../../assets/images/${imageNameWithExtension}';\n`;
            });

            const updatedContent = `${beforeTripleDash}\nimport { Image } from 'astro:assets';\n${imageImports}${afterTripleDash}`;

            fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
              if (err) {
                console.error('Error writing file:', err);
              } else {
                console.log(`Updated file: ${file}`);
              }
            });
          }
        }
      });
    }
  });
});
