/**
 * YOUTUBE ENHANCER: Speed & Quality Controller
 * Standards: ES6+, JSDoc, Industry Standard Naming
 */

const YT_ENHANCER_CONFIG = {
  SPEED_LABELS: {
    NORMAL: "⚡ 1x",
    FAST: "2x",
    SUPER_FAST: "2.5x"
  },
  TARGET_SELECTOR: "ytd-subscribe-button-renderer",
  POLLING_INTERVAL: 1000
};

/**
 * Initializes and injects the custom UI components into the YouTube interface.
 */
function injectEnhancerControls() {
  const injectionTarget = document.querySelector(YT_ENHANCER_CONFIG.TARGET_SELECTOR);

  // Guard clause: Ensure target exists and prevent duplicate injection
  if (
    !injectionTarget ||
    (document.getElementById("btn-speed-1x") &&
      document.getElementById("btn-speed-2x") &&
      document.getElementById("btn-speed-2.5x"))
  ) {
    return;
  }

  // Element Factory: Speed Buttons
  const btn1x = createStandardButton("btn-speed-1x", YT_ENHANCER_CONFIG.SPEED_LABELS.NORMAL);
  const btn2x = createStandardButton("btn-speed-2x", YT_ENHANCER_CONFIG.SPEED_LABELS.FAST);
  const btn25x = createStandardButton("btn-speed-2.5x", YT_ENHANCER_CONFIG.SPEED_LABELS.SUPER_FAST);

  // Playback Rate Event Listeners
  btn1x.onclick = () => updatePlaybackRate(1.0, btn1x, [btn1x, btn2x, btn25x]);
  btn2x.onclick = () => updatePlaybackRate(2.0, btn2x, [btn1x, btn2x, btn25x]);
  btn25x.onclick = () => updatePlaybackRate(2.7, btn25x, [btn1x, btn2x, btn25x]);

  // UI Layout Configuration
  const parentContainer = injectionTarget.parentElement;
  if (parentContainer) {
    parentContainer.style.display = "flex";
    parentContainer.style.alignItems = "center";
  }

  // DOM Injection Sequence (Order: 1x -> 2x -> 2.5x -> Dots)
  if (!document.getElementById("enhancer-menu-container")) {
    injectionTarget.after(createOptionsOverflowMenu());
    injectionTarget.after(btn25x);
    injectionTarget.after(btn2x);
    injectionTarget.after(btn1x);
  }
}

/**
 * Updates the video playback rate and refreshes UI styles.
 * @param {number} rate - The target playback speed.
 * @param {HTMLButtonElement} activeBtn - The clicked button.
 * @param {HTMLButtonElement[]} allButtons - Collection of buttons to reset.
 */
function updatePlaybackRate(rate, activeBtn, allButtons) {
  const videoElement = document.querySelector("video");
  if (videoElement) {
    resetButtonStates(allButtons);
    videoElement.playbackRate = rate;
    activeBtn.style.border = "1px solid rgba(255, 255, 255, 1)";
    
    // Update label with visual feedback icon
    const baseLabel = activeBtn.id.replace("btn-speed-", "");
    activeBtn.innerText = `⚡ ${baseLabel}`;
  }
}

/**
 * Factory for standardized YouTube-style buttons.
 */
function createStandardButton(elementId, label) {
  const button = document.createElement("button");
  button.id = elementId;
  button.innerText = label;

  Object.assign(button.style, {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "18px",
    padding: "0 16px",
    height: "36px",
    marginLeft: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background 0.3s, border 0.2s",
  });

  button.onmouseover = () => (button.style.backgroundColor = "rgba(255, 255, 255, 0.2)");
  button.onmouseout = () => (button.style.backgroundColor = "rgba(255, 255, 255, 0.1)");
  
  return button;
}

/**
 * Resets button labels and borders to default state.
 */
function resetButtonStates(buttons) {
  buttons.forEach((btn) => {
    btn.style.border = "1px solid rgba(255, 255, 255, 0.2)";
    const cleanLabel = btn.id.replace("btn-speed-", "");
    btn.innerText = cleanLabel;
  });
}

/**
 * Creates the secondary overflow menu for quality settings.
 */
function createOptionsOverflowMenu() {
  const menuContainer = document.createElement("div");
  menuContainer.id = "enhancer-menu-container";
  Object.assign(menuContainer.style, {
    display: "flex",
    alignItems: "center",
    position: "relative"
  });

  const overflowBtn = document.createElement("button");
  overflowBtn.innerHTML = "&#8942;"; 
  Object.assign(overflowBtn.style, {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    border: "none",
    borderRadius: "18px",
    height: "36px",
    padding: "0 10px",
    marginLeft: "12px",
    cursor: "pointer",
    fontSize: "24px",
  });

  const dropdownOverlay = document.createElement("div");
  dropdownOverlay.id = "enhancer-dropdown-menu";
  Object.assign(dropdownOverlay.style, {
    display: "none",
    position: "absolute",
    bottom: "45px",
    left: "0",
    backgroundColor: "#282828",
    border: "1px solid #444",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
    zIndex: "9999",
    width: "160px",
    padding: "8px 0",
  });

  dropdownOverlay.innerHTML = `
    <div id="item-quality-144p" class="menu-item" style="padding: 12px 15px; cursor: pointer; font-size: 14px; color: white;">144p</div>
    <div id="item-quality-720p" class="menu-item" style="padding: 12px 15px; cursor: pointer; font-size: 14px; color: white;">720p</div>
  `;

  // Item Hover Logic
  dropdownOverlay.querySelectorAll(".menu-item").forEach((item) => {
    item.onmouseover = () => (item.style.backgroundColor = "rgba(255, 255, 255, 0.1)");
    item.onmouseout = () => (item.style.backgroundColor = "transparent");
  });

  // Quality Selectors
  dropdownOverlay.querySelector("#item-quality-144p").onclick = (e) => {
    e.stopPropagation();
    automatedQualitySwitch("144p");
    dropdownOverlay.style.display = "none";
  };
  dropdownOverlay.querySelector("#item-quality-720p").onclick = (e) => {
    e.stopPropagation();
    automatedQualitySwitch("720p");
    dropdownOverlay.style.display = "none";
  };

  // Toggle Visibility
  overflowBtn.onclick = (e) => {
    e.stopPropagation();
    dropdownOverlay.style.display = dropdownOverlay.style.display === "none" ? "block" : "none";
  };

  menuContainer.appendChild(overflowBtn);
  menuContainer.appendChild(dropdownOverlay);
  return menuContainer;
}

/**
 * Automates the native YouTube quality selection process.
 */
async function automatedQualitySwitch(targetLabel) {
  const nativeSettingsMenu = document.querySelector(".ytp-settings-menu");
  const nativeSettingsBtn = document.querySelector(".ytp-settings-button");
  
  if (!nativeSettingsBtn) return;

  // Visual suppression of native menu
  if (nativeSettingsMenu) {
    nativeSettingsMenu.style.opacity = "0";
    nativeSettingsMenu.style.transition = "none";
  }

  nativeSettingsBtn.click();
  await new Promise((resolve) => setTimeout(resolve, 100));

  const menuItems = document.querySelectorAll(".ytp-menuitem");
  const qualitySubMenu = Array.from(menuItems).find((item) =>
    item.innerText.includes("Quality")
  );

  if (qualitySubMenu) {
    qualitySubMenu.click();
    await new Promise((resolve) => setTimeout(resolve, 100));

    const resolutionOptions = document.querySelectorAll(".ytp-menuitem");
    const targetOption = Array.from(resolutionOptions).find((option) =>
      option.innerText.includes(targetLabel)
    );

    if (targetOption) {
      targetOption.click();
    }
  }

  // Cleanup: Close native menu and restore opacity
  if (nativeSettingsBtn.getAttribute("aria-expanded") === "true") {
    nativeSettingsBtn.click();
  }

  if (nativeSettingsMenu) {
    setTimeout(() => (nativeSettingsMenu.style.opacity = "1"), 100);
  }
}

/**
 * Global click event for "Light Dismiss" pattern.
 */
document.addEventListener("click", () => {
  const dropdown = document.getElementById("enhancer-dropdown-menu");
  if (dropdown) dropdown.style.display = "none";
});

// Start Injection Loop
setInterval(injectEnhancerControls, YT_ENHANCER_CONFIG.POLLING_INTERVAL);