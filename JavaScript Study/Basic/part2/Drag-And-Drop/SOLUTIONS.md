# 드래그 앤 드롭 문제 솔루션

이 파일에는 드래그 앤 드롭 문제의 솔루션이 포함되어 있습니다.

## 정렬 가능한 리스트 (sortable-list.html)

```javascript
const sortableList = document.getElementById('sortableList');
const items = sortableList.querySelectorAll('.sortable-item');

// 드래그중인 요소
let draggedItem = null;

// 각 요소에 이벤트 리스너 추가
items.forEach(item => {
  // 드래그 시작
  item.addEventListener('dragstart', function(e) {
    draggedItem = this;
    setTimeout(() => {
      this.classList.add('dragging');
    }, 0);
  });
  
  // 드래그 종료
  item.addEventListener('dragend', function() {
    this.classList.remove('dragging');
    draggedItem = null;
    
    // 모든 드롭 영역 표시 제거
    items.forEach(item => item.classList.remove('drop-zone'));
  });
  
  // 드래그 중일 때
  item.addEventListener('dragover', function(e) {
    e.preventDefault();
  });
  
  // 드래그가 요소 위에 있을 때
  item.addEventListener('dragenter', function(e) {
    e.preventDefault();
    if (this !== draggedItem) {
      this.classList.add('drop-zone');
    }
  });
  
  // 드래그가 요소를 떠날 때
  item.addEventListener('dragleave', function() {
    this.classList.remove('drop-zone');
  });
  
  // 드롭
  item.addEventListener('drop', function(e) {
    e.preventDefault();
    
    if (this !== draggedItem) {
      // 겹쳐진 두 요소의 위치 비교
      let allItems = Array.from(sortableList.querySelectorAll('.sortable-item'));
      let draggedIndex = allItems.indexOf(draggedItem);
      let targetIndex = allItems.indexOf(this);
      
      // 드래그된 요소가 드롭 요소 앞에 오는지 뒤에 오는지 확인
      if (draggedIndex < targetIndex) {
        sortableList.insertBefore(draggedItem, this.nextSibling);
      } else {
        sortableList.insertBefore(draggedItem, this);
      }
      
      this.classList.remove('drop-zone');
    }
  });
});
```

## 고급 드래그 앤 드롭 (여러 목록 간 이동 가능)

```javascript
// 드래그 가능한 모든 항목 가져오기
const draggables = document.querySelectorAll('.draggable');
// 드롭 가능한 모든 컨테이너 가져오기
const containers = document.querySelectorAll('.container');

// 드래그 중인 요소 저장 변수
let draggedItem = null;

// 드래그 가능한 항목에 이벤트 리스너 추가
draggables.forEach(draggable => {
  // 드래그 시작
  draggable.addEventListener('dragstart', function(e) {
    draggedItem = this;
    this.classList.add('dragging');
    
    // 드래그 이미지 설정 (선택적)
    if (e.dataTransfer.setDragImage) {
      const dragIcon = document.createElement('div');
      dragIcon.className = 'drag-icon';
      dragIcon.textContent = this.textContent.charAt(0);
      document.body.appendChild(dragIcon);
      
      e.dataTransfer.setDragImage(dragIcon, 15, 15);
      
      // 잠시 후 드래그 아이콘 제거
      setTimeout(() => {
        document.body.removeChild(dragIcon);
      }, 0);
    }
    
    // 드래그되는 데이터 설정
    e.dataTransfer.setData('text/plain', this.textContent);
    e.dataTransfer.effectAllowed = 'move';
  });
  
  // 드래그 종료
  draggable.addEventListener('dragend', function() {
    this.classList.remove('dragging');
    draggedItem = null;
    
    // 모든 드롭 효과 제거
    document.querySelectorAll('.drop-zone').forEach(el => {
      el.classList.remove('drop-zone');
    });
  });
});

// 컨테이너에 이벤트 리스너 추가
containers.forEach(container => {
  // 드래그 요소가 컨테이너 위로 올라올 때
  container.addEventListener('dragover', function(e) {
    e.preventDefault();
    
    // 드롭 효과 설정
    e.dataTransfer.dropEffect = 'move';
    
    // 가장 가까운 드롭 위치 찾기
    const afterElement = getDragAfterElement(container, e.clientY);
    
    // 드롭 위치 표시
    container.querySelectorAll('.draggable:not(.dragging)').forEach(item => {
      item.classList.remove('drop-zone-before', 'drop-zone-after');
    });
    
    if (afterElement == null) {
      // 맨 끝에 추가
      const lastItem = container.querySelector('.draggable:last-child:not(.dragging)');
      if (lastItem) {
        lastItem.classList.add('drop-zone-after');
      } else {
        // 컨테이너가 비어있음
        container.classList.add('drop-zone');
      }
    } else {
      // 특정 요소 앞에 추가
      afterElement.classList.add('drop-zone-before');
    }
  });
  
  // 드래그 요소가 컨테이너를 떠날 때
  container.addEventListener('dragleave', function(e) {
    // 실제로 컨테이너를 떠날 때만 스타일 제거
    if (!container.contains(e.relatedTarget)) {
      container.classList.remove('drop-zone');
      container.querySelectorAll('.draggable').forEach(item => {
        item.classList.remove('drop-zone-before', 'drop-zone-after');
      });
    }
  });
  
  // 드롭 이벤트
  container.addEventListener('drop', function(e) {
    e.preventDefault();
    
    if (draggedItem) {
      // 드롭 위치 찾기
      const afterElement = getDragAfterElement(container, e.clientY);
      
      // 원래 있던 위치에서 제거 (없어도 됨, appendChild시 자동으로 이동)
      if (draggedItem.parentElement) {
        draggedItem.parentElement.removeChild(draggedItem);
      }
      
      // 새 위치에 추가
      if (afterElement == null) {
        container.appendChild(draggedItem);
      } else {
        container.insertBefore(draggedItem, afterElement);
      }
      
      // 항목이 이동된 후 이벤트 발생 (선택적)
      container.dispatchEvent(new CustomEvent('item-dropped', {
        bubbles: true,
        detail: { item: draggedItem }
      }));
    }
    
    // 모든 드롭 효과 제거
    container.classList.remove('drop-zone');
    container.querySelectorAll('.draggable').forEach(item => {
      item.classList.remove('drop-zone-before', 'drop-zone-after');
    });
  });
});

// Y 좌표를 기준으로 드롭 위치 결정
function getDragAfterElement(container, y) {
  // 드래그 중인 요소를 제외한 모든 드래그 가능 요소
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
  
  // 가장 가까운 요소 찾기
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    
    // 마우스가 요소 중간보다 위에 있고, 이전에 찾은 요소보다 더 가까움
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// 드래그 완료 후 업데이트 이벤트 리스너 (선택적)
document.addEventListener('item-dropped', function(e) {
  const item = e.detail.item;
  const container = item.parentElement;
  
  // 컨테이너의 항목 개수 업데이트
  const countElement = container.querySelector('.item-count');
  if (countElement) {
    const count = container.querySelectorAll('.draggable').length;
    countElement.textContent = `${count} 항목`;
  }
  
  // 드롭 후 시각적 효과 (선택적)
  item.classList.add('highlight');
  setTimeout(() => {
    item.classList.remove('highlight');
  }, 1000);
});
```

## 면접 시 주의사항

- HTML5 Drag and Drop API의 메서드와 이벤트, 그리고 dataTransfer 객체의 사용법을 명확히 이해하고 있어야 합니다.
- preventDefault()의 중요성, 특히 dragover 이벤트에서 이를 호출하지 않으면 drop 이벤트가 발생하지 않는 이유를 설명할 수 있어야 합니다.
- setTimeout 함수를 사용하여 dragstart 이벤트에서 클래스를 추가하는 이유(브라우저 렌더링 타이밍 문제)를 설명할 수 있으면 좋습니다.
- 드래그 앤 드롭 기능의 접근성 이슈와 해결 방법을 알고 있으면 좋습니다(키보드 접근성, ARIA 속성 등).
- 모바일 디바이스에서 드래그 앤 드롭 대안(터치 이벤트 활용 등)을 알고 있으면 좋습니다.
- 성능 최적화 관점에서 많은 항목을 드래그할 때 고려해야 할 사항을 설명할 수 있으면 좋습니다.
