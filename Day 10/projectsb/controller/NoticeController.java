package com.example.projectsb.controller;

import com.example.projectsb.model.Notice;
import com.example.projectsb.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notice> getNoticeById(@PathVariable Integer id) {
        Optional<Notice> notice = noticeService.getNoticeById(id);
        return notice.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Notice> createNotice(@RequestBody Notice notice) {
        Notice savedNotice = noticeService.saveNotice(notice);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedNotice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notice> updateNotice(@PathVariable Integer id, @RequestBody Notice notice) {
        if (noticeService.getNoticeById(id).isPresent()) {
            notice.setId(id);
            Notice updatedNotice = noticeService.saveNotice(notice);
            return ResponseEntity.ok(updatedNotice);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotice(@PathVariable Integer id) {
        if (noticeService.getNoticeById(id).isPresent()) {
            noticeService.deleteNotice(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
