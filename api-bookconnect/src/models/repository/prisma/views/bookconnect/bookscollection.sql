SELECT
  `u`.`username` AS `username`,
  `u`.`image_path` AS `user_image`,
  `b`.`title` AS `title`,
  `b`.`image_path` AS `book_image`,
  `g`.`name` AS `genre`,
  `c`.`rating` AS `rating`,
  `c`.`review` AS `review`,
  `s`.`type` AS `status`,
  `l`.`name` AS `list`,
  `u`.`id` AS `user_id`,
  `b`.`id` AS `book_id`,
  `c`.`id` AS `collection_id`,
  `g`.`id` AS `genre_id`,
  `s`.`id` AS `status_id`,
  `l`.`id` AS `list_id`
FROM
  (
    (
      (
        (
          (
            (
              `bookconnect`.`collection` `c`
              JOIN `bookconnect`.`user` `u` ON((`c`.`userId` = `u`.`id`))
            )
            JOIN `bookconnect`.`book` `b` ON((`c`.`bookId` = `b`.`id`))
          )
          JOIN `bookconnect`.`state` `s` ON((`s`.`id` = `c`.`stateId`))
        )
        JOIN `bookconnect`.`genre` `g` ON((`b`.`genreId` = `g`.`id`))
      )
      LEFT JOIN `bookconnect`.`collection_list` `cl` ON((`c`.`id` = `cl`.`collectionId`))
    )
    LEFT JOIN `bookconnect`.`list` `l` ON((`cl`.`listId` = `l`.`id`))
  )