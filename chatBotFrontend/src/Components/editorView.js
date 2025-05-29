import { useState } from "react";
import { Edit2, Image, Save, Trash, PlusCircle } from "lucide-react";
import "./editorView.css"; // Import the CSS file

// Sample data structure to represent an article
// You would replace this with your API data
const initialArticleData = {
  title: "Powering the Future: Navigating Patent Law for Lithium-Ion Batteries",
  blocks: [
    {
      id: "1",
      type: "text",
      content: "    Lithium-ion batteries have revolutionized the modern world, powering everything from our smartphones and laptops to electric vehicles and grid-scale energy storage. As the demand for these energy powerhouses continues to surge, the landscape of innovation surrounding them is equally dynamic. Protecting these groundbreaking advancements is crucial, and patent law plays a vital role in fostering further development and ensuring a competitive marketplace. Understanding the nuances of patent law applicable to lithium-ion batteries is essential for researchers, startups, and established corporations alike."
    },
    {
      id: "2",
      type: "image",
      content: "images/lithium_ion.jpg",
      alt: "Sample image"
    },
    {
      id: "3",
      type: "text",
      content: "This is another paragraph that demonstrates how the editor works. You can edit each block individually."
    },
    {
      id: "4",
      type: "image",
      content: "/api/placeholder/600/300",
      alt: "Another placeholder image"
    }
  ]
};

export default function ArticleEditor() {
  const [article, setArticle] = useState(initialArticleData);
  const [title, setTitle] = useState(initialArticleData.title);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [editingImageUrl, setEditingImageUrl] = useState("");
  const [editingImageAlt, setEditingImageAlt] = useState("");

  // Start editing a text block
  const startEditingBlock = (id, content) => {
    setEditingBlock(id);
    setEditingContent(content);
  };

  // Start editing an image block
  const startEditingImage = (id, url, alt) => {
    setEditingBlock(id);
    setEditingImageUrl(url);
    setEditingImageAlt(alt);
  };

  // Save changes to a text block
  const saveTextBlock = () => {
    setArticle({
      ...article,
      blocks: article.blocks.map(block =>
        block.id === editingBlock ? { ...block, content: editingContent } : block
      )
    });
    setEditingBlock(null);
  };

  // Save changes to an image block
  const saveImageBlock = () => {
    setArticle({
      ...article,
      blocks: article.blocks.map(block =>
        block.id === editingBlock ?
          { ...block, content: editingImageUrl, alt: editingImageAlt } :
          block
      )
    });
    setEditingBlock(null);
  };

  // Delete a block
  const deleteBlock = (id) => {
    setArticle({
      ...article,
      blocks: article.blocks.filter(block => block.id !== id)
    });
    if (editingBlock === id) {
      setEditingBlock(null);
    }
  };

  // Add a new text block
  const addTextBlock = () => {
    const newBlock = {
      id: `text-${Date.now()}`,
      type: "text",
      content: "New paragraph text"
    };
    setArticle({
      ...article,
      blocks: [...article.blocks, newBlock]
    });
  };

  // Add a new image block
  const addImageBlock = () => {
    const newBlock = {
      id: `image-${Date.now()}`,
      type: "image",
      content: "/api/placeholder/600/400",
      alt: "New image"
    };
    setArticle({
      ...article,
      blocks: [...article.blocks, newBlock]
    });
  };

  // Save the title
  const saveTitle = () => {
    setArticle({
      ...article,
      title: title
    });
    setEditingTitle(false);
  };

  return (
    <div className="article-editor-container">
      {/* Article Title */}
      <div className="article-title-container">
        {editingTitle ? (
          <div className="edit-title-input-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="edit-title-input"
              autoFocus
            />
            <button
              onClick={saveTitle}
              className="save-title-button"
            >
              <Save size={20} />
            </button>
          </div>
        ) : (
          <div className="view-title-container">
            <h1 className="article-title">{title}</h1>
            <button
              onClick={() => setEditingTitle(true)}
              className="edit-title-button"
            >
              <Edit2 size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Article Blocks */}
      <div className="article-blocks-container">
        {article.blocks.map((block) => (
          <div key={block.id} className="article-block">
            {/* Block Controls */}
            <div className="block-controls">
              {block.type === "text" ? (
                <button
                  onClick={() => startEditingBlock(block.id, block.content)}
                  className="edit-block-button"
                  title="Edit text"
                >
                  <Edit2 size={16} />
                </button>
              ) : (
                <button
                  onClick={() => startEditingImage(block.id, block.content, block.alt)}
                  className="edit-block-button"
                  title="Edit image"
                >
                  <Edit2 size={16} />
                </button>
              )}
              <button
                onClick={() => deleteBlock(block.id)}
                className="delete-block-button"
                title="Delete block"
              >
                <Trash size={16} />
              </button>
            </div>

            {/* Block Content */}
            {block.type === "text" ? (
              editingBlock === block.id ? (
                <div className="edit-text-area">
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="text-input"
                    autoFocus
                  />
                  <button
                    onClick={saveTextBlock}
                    className="save-block-button"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <p className="text-content">{block.content}</p>
              )
            ) : block.type === "image" ? (
              editingBlock === block.id ? (
                <div className="edit-image-form">
                  <div className="form-group">
                    <label className="form-label">Image URL</label>
                    <input
                      type="text"
                      value={editingImageUrl}
                      onChange={(e) => setEditingImageUrl(e.target.value)}
                      className="input-field"
                      placeholder="Image URL or placeholder"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Alt Text</label>
                    <input
                      type="text"
                      value={editingImageAlt}
                      onChange={(e) => setEditingImageAlt(e.target.value)}
                      className="input-field"
                      placeholder="Image description"
                    />
                  </div>
                  <button
                    onClick={saveImageBlock}
                    className="save-block-button"
                  >
                    Save Image
                  </button>
                </div>
              ) : (
                <div className="image-container">
                  <img
                    src={block.content}
                    alt={block.alt}
                    className="article-image"
                  />
                </div>
              )
            ) : null}
          </div>
        ))}
      </div>

      {/* Add New Blocks */}
      <div className="add-blocks-container">
        <button
          onClick={addTextBlock}
          className="add-text-button"
        >
          <PlusCircle size={16} className="button-icon" />
          Add Text Block
        </button>
        <button
          onClick={addImageBlock}
          className="add-image-button"
        >
          <Image size={16} className="button-icon" />
          Add Image Block
        </button>
      </div>

      {/* Output Preview (for development) */}
      <div className="output-preview-container">
        <h3 className="output-title">Article Structure (JSON):</h3>
        <pre className="output-json">
          {JSON.stringify(article, null, 2)}
        </pre>
      </div>
    </div>
  );
}